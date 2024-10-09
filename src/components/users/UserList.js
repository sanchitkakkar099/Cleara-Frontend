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
  useClientUserListMutation,
  useDeleteClientUserMutation

} from "../../service";
// import UserView from "./UserView";
import useDebounce from "../../hook/useDebounce";
import { getUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function UserList() {
    const navigate = useNavigate();
    const userListData = useSelector((state) => state.userState.userList);
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [searchFields, setSearchFields] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [viewData, setViewData] = useState(null);
    const debounceSearch = useDebounce(searchFields, 500);
    const [reqCreateClientUser, resCreateClientUser] = useClientUserListMutation();
    const [reqDelete, resDelete] = useDeleteClientUserMutation();
    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(null);
  useEffect(() => {
      reqCreateClientUser({
        page: currentPage,
        limit: 10,
        search: debounceSearch || "",
      });
    }, [currentPage,debounceSearch]);

    useEffect(() => {
      if (resCreateClientUser?.isSuccess) {
        dispatch(getUser(resCreateClientUser?.data?.data?.docs));
        setPageCount(resCreateClientUser?.data?.data?.totalPages);
      }
    }, [resCreateClientUser]);
  console.log("resCreateClientUser",resCreateClientUser.data);
  console.log("userList",userListData);

    useEffect(() => {
      if (resCreateClientUser?.isError) {
        toast.error(
          resCreateClientUser?.error?.data?.message
            ? resCreateClientUser?.error?.data?.message
            : "Something Went Wrong",
          {
            position: "top-center",
            duration: 3000,
          }
        );
      }
    }, [resCreateClientUser?.isError]);

  
    const onViewAction = (e, st) => {
      // console.log("user ", st);
      e.preventDefault();
      setViewData(st);
      setModal(true);
    };

    const onEditAction = (e, cs) => {
      e.preventDefault();
      navigate("/user-form", {
        state: {
          userId: cs?._id,
          isEdit: true,
        },
      });
    };
  
    const handleDeleteModal = (e, details) => {
      // console.log("details",details);
      e.preventDefault();
      
      setModalDetails({
        username : details?.fname+" "+details.lname,
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
        reqCreateClientUser({
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
          <CardTitle tag="h4">User List</CardTitle>
        </CardHeader>
        <CardBody>
        <Row>
          <Col md="6" className="d-flex">
            <div className="w-50 me-1">
              <Label for="status-select">Search</Label>
              <Input
                id="search-invoice"
                type="text"
                placeholder="By user name or email"
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
                onClick={(e) => navigate("/user-form")}
                className="mt-2"
              >
                Add User
              </Button>
            </div>
          </Col>
        </Row>
          <Row className="mt-2">
            <Col md="12">
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Job Title</th>
                    <th>Phone</th>
                    <th>Ext</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Created By</th>
                    <th>Date Modified</th>
                    <th>Modified By</th>
                    <th>Sessions</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(userListData) && userListData?.length > 0 ? (
                  userListData?.map((cs, i) => {
                    return (
                      <tr key={i}>
                        <td>{cs?.fname+" "+cs?.lname}</td>
                        <td>
                          <Link target="_blank" to={`https://ducatindia.com/${cs?.seo_url}`}>
                            {cs?.email}
                          </Link>
                        </td>
                        <td>{cs?.phone}</td>
                        <td>{cs?.service?.map(item => item+", ")}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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
    {/* <View modal={modal} setModal={setModal} viewData={viewData} /> */}
    <VerifyDeleteModal
    showModal={showModal}
    setShowModal={setShowModal}
    modalDetails={modalDetails}
    confirmAction={reqDelete}
  />
  </>
  )
}

export default UserList
