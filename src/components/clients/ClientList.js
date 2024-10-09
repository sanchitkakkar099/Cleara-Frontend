import React, { useState, useEffect } from "react";
import { Edit, Eye, MoreVertical, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";
import dayjs from 'dayjs';
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
import { useClientListMutation, useDeleteClientMutation } from "../../service";
import ClientView from "./ClientView";
import useDebounce from "../../hook/useDebounce";
import { getClient } from "../../redux/clientSlice";
import { useDispatch, useSelector } from "react-redux";

function ClientList() {
  const navigate = useNavigate();
  const clientListData = useSelector((state) => state.clientState.clientList);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [searchFields, setSearchFields] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [viewData, setViewData] = useState(null);
  const debounceSearch = useDebounce(searchFields, 500);
  const [reqClientData, resClientData] = useClientListMutation();
  const [reqDelete, resDelete] = useDeleteClientMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  useEffect(() => {
    reqClientData({
      page: currentPage,
      limit: 10,
      search: debounceSearch || "",
    });
  }, [currentPage, debounceSearch]);

  useEffect(() => {
    if (resClientData?.isSuccess) {
      dispatch(getClient(resClientData?.data?.data?.docs));
      setPageCount(resClientData?.data?.data?.totalPages);
    }
  }, [resClientData]);
  console.log("resClientData",resClientData.data);
  console.log("clientList",clientListData);

  useEffect(() => {
    if (resClientData?.isError) {
      toast.error(
        resClientData?.error?.data?.message
          ? resClientData?.error?.data?.message
          : "Something Went Wrong",
        {
          position: "top-center",
          duration: 3000,
        }
      );
    }
  }, [resClientData?.isError]);

  const onViewAction = (e, st) => {
    // console.log("client ", st);
    e.preventDefault();
    setViewData(st);
    setModal(true);
  };

  const onEditAction = (e, cs) => {
    e.preventDefault();
    navigate("/client-form", {
      state: {
        clientId: cs?._id,
        isEdit: true,
      },
    });
  };

  const handleDeleteModal = (e, details) => {
    // console.log("details",details);
    e.preventDefault();

    setModalDetails({
      clientname: details?.fname + " " + details.lname,
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
      reqClientData({
        page: currentPage,
        limit: 10,
      });
      setShowModal(false);
      setModalDetails(null);
    }
  }, [resDelete]);

  const handleSearchField = (e) => {
    setSearchFields(e.target.value);
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page?.selected + 1);
  };
  return (
    <>
      <div className="app-user-list">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle tag="h4">Client List</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6" className="d-flex">
                <div className="w-50 me-1">
                  <Label for="status-select">Search</Label>
                  <Input
                    id="search-invoice"
                    type="text"
                    placeholder="By client name or email"
                    onChange={(e) => handleSearchField(e)}
                  />
                </div>
              </Col>
              <Col md="6" className="d-flex justify-content-end">
                <div className="w-30">
                  <Button
                    color="primary"
                    onClick={(e) => navigate("/client-form")}
                    className="mt-2"
                  >
                    Add Client
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md="12">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Contact</th>
                      <th>Phone</th>
                      <th>Modified</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(clientListData) &&
                    clientListData?.length > 0 ? (
                      clientListData?.map((cs, i) => {
                        return (
                          <tr key={i}>
                            <td>{cs?.companyName}</td>
                            <td>{cs?.clientCode}</td>
                            <td>
                                {cs?.name}
                            </td>
                            <td>{cs?.clientphone}</td>
                            <td>{cs?.updatedAt ? month[new Date(cs?.updatedAt).getMonth()]+","+ new Date(cs?.updatedAt).getDate()+" "+ new Date(cs?.updatedAt).getFullYear(): "-"}</td>
                            <td>{cs?.accountstatus}</td>
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
      <ClientView modal={modal} setModal={setModal} viewData={viewData} />
      <VerifyDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalDetails={modalDetails}
        confirmAction={reqDelete}
      />
    </>
  );
}

export default ClientList;
