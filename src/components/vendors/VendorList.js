import React, { useState, useEffect } from "react";
import { Edit, Eye, MoreVertical, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import VerifyDeleteModal from "../common/VerifyDeleteModal";
import {
  Button,
  Card,           
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  useVendorListMutation,
  useDeleteVendorMutation

} from "../../service";
import VendorView from "./VendorView";
import useDebounce from "../../hook/useDebounce";
import { getVendor } from "../../redux/vendorSlice";
import { useDispatch, useSelector } from "react-redux";

function VendorList() {
    const navigate = useNavigate();
    const vendorListData = useSelector((state) => state.vendorState.vendorList);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [searchFields, setSearchFields] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [viewData, setViewData] = useState(null);
    const debounceSearch = useDebounce(searchFields, 500);
    const [reqVendorData, resVendorData] = useVendorListMutation();
    const [reqDelete, resDelete] = useDeleteVendorMutation();
    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
  useEffect(() => {
      reqVendorData({
        page: currentPage,
        limit: 10,
        search: debounceSearch || "",
      });
    }, [currentPage,debounceSearch]);

    useEffect(() => {
      if (resVendorData?.isSuccess) {
        dispatch(getVendor(resVendorData?.data?.data?.docs));
        setPageCount(resVendorData?.data?.data?.totalPages);
      }
    }, [resVendorData]);
  // console.log("resVendorData",resVendorData.data);
  // console.log("vendorList",vendorListData);
    const vendorData = {}; // Initialize as an empty object, not an array

    useEffect(() => {
      if (resVendorData?.isError) {
        toast.error(
          resVendorData?.error?.data?.message
            ? resVendorData?.error?.data?.message
            : "Something Went Wrong",
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    }, [resVendorData?.isError]);

  
    const onViewAction = (e, st) => {
      // console.log("vendor ", st);
      e.preventDefault();
      setViewData(st);
      setModal(true);
    };

    const onEditAction = (e, cs) => {
      e.preventDefault();
      navigate("/vendor-form", {
        state: {
          vendorId: cs?._id,
          isEdit: true,
        },
      });
    };
  
    const handleDeleteModal = (e, details) => {
      // console.log("details",details);
      e.preventDefault();
      
      setModalDetails({
        vendorname : details?.fname+" "+details.lname,
        id: details?._id,
      });
      setShowModal(true);
    };

    useEffect(() => {
      if (resDelete?.isSuccess) {
        toast.success(resDelete?.data?.message, {
          position: "top-center",
          duration: 3000,
        });
        reqVendorData({
          page: currentPage,
          limit: 10,
        });
        setShowModal(false);
        setModalDetails(null);
      }
    }, [resDelete]);

    const handleSearchField = (e) => {
        setSearchFields(e.target.value);
        setCurrentPage(1)
      };
  
    const handlePagination = (page) => {
      setCurrentPage(page?.selected + 1);
    };
    return (
      <>
        <div className="app-user-list">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle tag="h4">Vendor List</CardTitle>
            </CardHeader>
            <CardBody>
            <Row>
              <Col md="6" className="d-flex">
                <div className="w-50 me-1">
                  <Label for="status-select">Search</Label>
                  <Input
                    id="search-invoice"
                    type="text"
                    placeholder="By vendor name or email"
                    onChange={(e) => handleSearchField(e)}
                  />
                </div>
                {/* <div className="w-50">
                  <Label for="status-select">Status</Label>
                  <Select
                    isClearable
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "In Active", value: "Inactive" },
                    ]}
                    className="react-select"
                    classNamePrefix="select"
                    value={searchByStatus}
                    onChange={(val) => handleSearchStatus(val)}
                  />
                </div> */}
              </Col>
              <Col md="6" className="d-flex justify-content-end">
                {/* <div className="w-30 me-1">
                  <UncontrolledDropdown
                    className="mt-2"
                    onClick={(e) => downloadCSV(e)}
                  >
                    <DropdownToggle color="secondary" outline>
                      <Download className="font-small-4 me-50" />
                      <span className="align-middle">Excel</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </div> */}
                <div className="w-30">
                  <Button
                    color="primary"
                    onClick={(e) => navigate("/vendor-form")}
                    className="mt-2"
                  >
                    Add Vendor
                  </Button>
                </div>
              </Col>
            </Row>
              <Row className="mt-2">
                <Col md="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>Vendor Name</th>
                        <th>Vendor Email</th>
                        <th>Phone Number</th>
                        <th>Selected Services</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(vendorListData) && vendorListData?.length > 0 ? (
                      vendorListData?.map((cs, i) => {
                        return (
                          <tr key={i}>
                            <td>{cs?.fname+" "+cs?.lname}</td>
                            <td>
                              <Link target="_blank" to={`https://ducatindia.com/${cs?.seo_url}`}>
                                {cs?.email}
                              </Link>
                            </td>
                            <td>{cs?.vendorphone}</td>
                            <td>{cs?.service?.map(item => item+", ")}</td>
                            <td>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="icon-btn hide-arrow"
                                  color="transparent"
                                  size="sm"
                                  caret
                                >
                                  <MoreVertical size={15} />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem
                                    href="#!"
                                    onClick={(e) => onViewAction(e, cs)}
                                  >
                                    <Eye className="me-50" size={15} />{" "}
                                    <span className="align-middle">View</span>
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#!"
                                    onClick={(e) => onEditAction(e, cs)}
                                  >
                                    <Edit className="me-50" size={15} />{" "}
                                    <span className="align-middle">Edit</span>
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#!"
                                    onClick={(e) => handleDeleteModal(e, cs)}
                                  >
                                    <Trash className="me-50" size={15} />{" "}
                                    <span className="align-middle">Delete</span>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={7}>
                          No Data Found
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
            <ReactPaginate
              breakLabel={"..."}
              previousLabel={""}
              nextLabel={""}
              pageCount={pageCount}
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              activeClassName="active"
              onPageChange={(page) => handlePagination(page)}
              pageClassName={"page-item"}
              nextLinkClassName={"page-link"}
              nextClassName={"page-item next"}
              previousClassName={"page-item prev"}
              previousLinkClassName={"page-link"}
              pageLinkClassName={"page-link"}
              containerClassName={`pagination ${
                pageCount > 0 ? "" : "hidden"
              } react-paginate justify-content-end my-2 pe-1`}
            />
          </Card>
        </div>
        <VendorView modal={modal} setModal={setModal} viewData={viewData} />
        <VerifyDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalDetails={modalDetails}
        confirmAction={reqDelete}
      />
      </>
    );
}

export default VendorList
