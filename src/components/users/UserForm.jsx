import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserDropdown, setUserEdit } from "../../redux/userSlice";
import { useCreateClientUserMutation, useClientUserByIdQuery } from "../../service";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Typeahead } from "react-bootstrap-typeahead";
function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmpasswordShow, setConfirmPasswordShow] = useState(false);
  const [reqCreateClientUser, resCreateClientUser] = useCreateClientUserMutation();
  const [adressCheck, setAdressCheck] = useState(false);
  const [newpasswordDisabled, setNewpasswordDisabled] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [disableMFA, setDisableMFA] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
    setError,
  } = useForm();


  useEffect(() => {
    if (resCreateClientUser?.isSuccess) {
      toast.success(resCreateClientUser?.data?.message, {
        position: "top-center",
        duration: 3000,
      });
      navigate("/user-form");
    }
  }, [resCreateClientUser?.isSuccess]);

  useEffect(() => {
    console.log("error after creation",resCreateClientUser);
    if (resCreateClientUser?.isError) {
      toast.error(resCreateClientUser?.data?.message, {
        position: "top-center",
        duration: 3000,
      });
      navigate("/user-form");
    }
  }, [resCreateClientUser?.isError]);

  const options = [
    { value: "Text Message", label: "Text Message" },
    { value: "User Set Up Required", label: "User Set Up Required" },
  ];

  const handleNewaccount = (e) => {
    setNewpasswordDisabled(e.target.checked);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStatusChange = (event) => {
    setUserStatus(event.target.value);
  };

  const onSubmit = async (state) => {
    const payload = {
      ...state,
      loginType: selectedOption,
      userStatus: userStatus,
      changepassword: passwordChanged,
      newpassword : state?.newpassword ? state?.newpassword : "",
      confirmpassword : state?.confirmpassword ? state?.confirmpassword : "",
      userAltphoneEXT : state?.userAltphoneEXT ? state?.userAltphoneEXT : "", 
      userphoneExt : state?.userphoneExt ? state?.userphoneExt : "",
      textmessage : state?.textmessage === "Text Message" ? true : false,
    };
    console.log("payload", payload);
    reqCreateClientUser(payload);
  };
console.log("resCreateClientUser",resCreateClientUser)
  return (
    <div>
      <Card>
        <div style={{ backgroundColor: "#7367f0" }}>
          <CardHeader style={{ color: "white" }}>
            <CardTitle tag="h4">Details</CardTitle>
          </CardHeader>
        </div>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/* User personal Info start */}
              <Col md="6" className="mb-1">
                <div className="h4 mb-2">Personal Information</div>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="userfirstname">
                    First Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Controller
                    id="userfirstname"
                    name="userfirstname"
                    control={control}
                    value
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <Input type="text" placeholder="First Name" {...field} />
                    )}
                  />
                  {errors?.userfirstname && (
                    <FormFeedback>
                      {errors?.userfirstname?.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="userlastname">
                    Last Name
                  </Label>
                  <Controller
                    id="userlastname"
                    name="userlastname"
                    control={control}
                    // rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Parent Company"
                        {...field}
                      />
                    )}
                  />
                  {errors?.userlastname && (
                    <FormFeedback>{errors?.userlastname?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                  <Label className="form-label" for="jobtitle">
                    Job Title
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </Label>
                  <Controller
                    id="jobtitle"
                    name="jobtitle"
                    control={control}
                    // rules={{ required: "  Title is required" }}
                    render={({ field }) => (
                      <Input type="text" placeholder="Job Title" {...field} />
                    )}
                  />
                  {errors?.jobtitle && (
                    <FormFeedback>{errors?.jobtitle?.message}</FormFeedback>
                  )}
                </Col>
                <Row>
                  <Col md="8" sm="12" className="mb-1">
                    <Label className="form-label" for="userphone">
                      Phone number<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="userphone"
                      name="userphone"
                      control={control}
                      rules={{ required: "Phone Number is required" }}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="User Phone Number"
                          {...field}
                        />
                      )}
                    />
                    {errors?.userphone && (
                      <FormFeedback>{errors?.userphone?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="userphoneExt">
                      EXT
                    </Label>
                    <Controller
                      id="userphoneExt"
                      name="userphoneExt"
                      control={control}
                      // rules={{ required: "Phone Number is required" }}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      )}
                    />
                    {errors?.userphoneExt && (
                      <FormFeedback>
                        {errors?.userphoneExt?.message}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="8" sm="12" className="mb-1">
                    <Label className="form-label" for="userAltphone">
                      Alt number
                    </Label>
                    <Controller
                      id="userAltphone"
                      name="userAltphone"
                      control={control}
                      // rules={{ required: "Phone Number is required" }}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      )}
                    />
                    {errors?.userAltphone && (
                      <FormFeedback>
                        {errors?.userAltphone?.message}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="userAltphoneEXT">
                      EXT
                    </Label>
                    <Controller
                      id="userAltphoneEXT"
                      name="userAltphoneEXT"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Phone Number"
                          {...field}
                        />
                      )}
                    />
                    {errors?.userAltphoneEXT && (
                      <FormFeedback>
                        {errors?.userAltphoneEXT?.message}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                <Col md="12" sm="12" className="mb-1">
                  <Label className="form-label" for="userfaxNumber">
                    Fax Numnber
                  </Label>
                  <Controller
                    id="userfaxNumber"
                    name="userfaxNumber"
                    control={control}
                    // rules={{ required: "Fax number is required" }}
                    render={({ field }) => (
                      <Input
                        type="faxNumber"
                        placeholder="Fax Number"
                        {...field}
                      />
                    )}
                  />
                  {errors?.userfaxNumber && (
                    <FormFeedback>
                      {errors?.userfaxNumber?.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                  <Label className="form-label" for="userfaxinstruction">
                    Fax Instruction
                  </Label>
                  <Controller
                    id="userfaxInstruction"
                    name="userfaxInstruction"
                    control={control}
                    // rules={{ required: "Fax Instruction is required" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Fax Instruction"
                        {...field}
                      />
                    )}
                  />
                  {errors?.userfaxInstruction && (
                    <FormFeedback>
                      {errors?.userfaxInstruction?.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="email">
                    Email<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Controller
                    id="email"
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        name="email"
                      />
                    )}
                  />
                  {errors?.email && (
                    <FormFeedback>{errors?.email?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12">
                  <Label for="exampleText">Notes On User</Label>
                  <Controller
                    id="userNote"
                    name="userNote"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="textarea"
                        name="text"
                        id="exampleText"
                        placeholder="Enter your text here"
                        {...field}
                        rows="5"
                      />
                    )}
                  />
                  {errors?.userNote && (
                    <FormFeedback>{errors?.userNote?.message}</FormFeedback>
                  )}
                </Col>
              </Col>
              {/* User personal Info ends */}

              {/* User Account Infor Starts */}
              <Col md="6" className="mb-1">
                <div className="h4 mb-2">Account Information</div>
                <Row>
                  <Label className="form-label" for="accessType">
                    Login Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Col md="12" className="mb-2" style={{ display: "flex" }}>
                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for="userStandard"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="accessLevel"
                          value="Standard"
                          checked={selectedOption === "Standard"}
                          onChange={handleOptionChange}
                          style={{ marginRight: "5px" }}
                        />
                        Standard
                      </Label>
                    </Col>

                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for="userLinkOnly"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="accessLevel"
                          value="Link Only"
                          checked={selectedOption === "Link Only"}
                          onChange={handleOptionChange}
                          style={{ marginRight: "5px" }}
                        />
                        Link Only
                      </Label>
                    </Col>

                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for="userXmlOnly"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="accessLevel"
                          value="XML Only"
                          checked={selectedOption === "XML Only"}
                          onChange={handleOptionChange}
                          style={{ marginRight: "5px" }}
                        />
                        XML Only
                      </Label>
                    </Col>

                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for="userNoAccess"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="accessLevel"
                          value="No Access"
                          checked={selectedOption === "No Access"}
                          onChange={handleOptionChange}
                          style={{ marginRight: "5px" }}
                        />
                        No Access
                      </Label>
                    </Col>
                  </Col>
                </Row>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="username">
                    User Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Controller
                    id="username"
                    name="username"
                    control={control}
                    rules={{ required: "User name is required" }}
                    render={({ field }) => (
                      <Input type="text" placeholder="User name" {...field} />
                    )}
                  />
                  {errors?.username && (
                    <FormFeedback>{errors?.username?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                  <FormGroup check inline>
                    <Controller
                      id="newaccount"
                      name="newaccount"
                      control={control}
                      // rules={{ required: "Client Code is required" }}
                      render={({ field }) => (
                        <Input
                          type="checkbox"
                          {...field}
                          onClick={(e) => handleNewaccount(e)}
                        />
                      )}
                    />
                    <Label check>Send New Account Setup Email</Label>
                  </FormGroup>
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="newpassword">
                    New Password
                  </Label>
                  <div className="input-group-merge input-group">
                    <Controller
                      id="newpassword"
                      name="newpassword"
                      control={control}
                      // rules={{
                      //   required: "Password is required",
                      // }}
                      render={({ field }) => (
                        <Input
                          placeholder="············"
                          id="newpassword"
                          type={passwordShow ? "text" : "password"}
                          autoComplete="on"
                          disabled={newpasswordDisabled}
                          className="form-control"
                          {...field}
                        />
                      )}
                    />
                    <span
                      className="cursor-pointer input-group-text"
                      onClick={() => setPasswordShow(!passwordShow)}
                    >
                      {passwordShow ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      )}
                    </span>
                    {errors?.newpassword && (
                      <FormFeedback>
                        {errors?.newpassword?.message}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="confirmpassword">
                    Confirm New Password
                  </Label>
                  <div className="input-group-merge input-group">
                    <Controller
                      id="confirmpassword"
                      name="confirmpassword"
                      control={control}
                      // rules={{
                      //   required: "Password is required",
                      // }}
                      render={({ field }) => (
                        <Input
                          placeholder="············"
                          id="confirmpassword"
                          type={confirmpasswordShow ? "text" : "password"}
                          autoComplete="on"
                          disabled={newpasswordDisabled}
                          className="form-control"
                          {...field}
                        />
                      )}
                    />
                    <span
                      className="cursor-pointer input-group-text"
                      onClick={() =>
                        setConfirmPasswordShow(!confirmpasswordShow)
                      }
                    >
                      {confirmpasswordShow ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      )}
                    </span>

                    {errors?.confirmpassword && (
                      <FormFeedback>
                        {errors?.confirmpassword?.message}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col md="12" sm="12" className="mb-1">
                  <FormGroup check inline>
                    <Controller
                      id="changepassword"
                      name="changepassword"
                      control={control}
                      // rules={{ required: "Change Password is required" }}
                      render={({ field }) => (
                        <Input
                          type="checkbox"
                          {...field}
                          onChange={() => setPasswordChanged(!passwordChanged)}
                        />
                      )}
                    />
                    <Label check>Force Password Change</Label>
                  </FormGroup>
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="accessType">
                    Status<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Col md="12" className="mb-2" style={{ display: "flex" }}>
                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for="Active"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="Active"
                          value="Active"
                          checked={userStatus === "Active"}
                          onChange={handleStatusChange}
                          style={{ marginRight: "5px" }}
                        />
                        Active
                      </Label>
                    </Col>

                    <Col md="3" className="mb-1">
                      <Label
                        className="form-label"
                        for=""
                        disabled
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="radio"
                          name="Disabled"
                          value="Disabled"
                          checked={userStatus === "Disabled"}
                          onChange={handleStatusChange}
                          style={{ marginRight: "5px" }}
                        />
                        Disabled
                      </Label>
                    </Col>
                  </Col>
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="disableMessage">
                    Disabled User Message
                  </Label>
                  <Controller
                    id="disableMessage"
                    name="disableMessage"
                    control={control}
                    // rules={{ required: "Parent company is required" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        //   placeholder="User name"
                        {...field}
                      />
                    )}
                  />
                  {errors?.disableMessage && (
                    <FormFeedback>
                      {errors?.disableMessage?.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="disableReason">
                    Reason User Was Disabled
                  </Label>
                  <Controller
                    id="disableReason"
                    name="disableReason"
                    control={control}
                    // rules={{ required: "Parent company is required" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        //   placeholder="User name"
                        {...field}
                      />
                    )}
                  />
                  {errors?.disableReason && (
                    <FormFeedback>
                      {errors?.disableReason?.message}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12">
                  <Label for="exampleText">USER ACCESS IP LIST</Label>
                  <Controller
                    id="usersiplist"
                    name="usersiplist"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="textarea"
                        name="text"
                        id="usersiplist"
                        {...field}
                        //   placeholder="Enter your text here"
                        rows="5"
                      />
                    )}
                  />
                  {errors?.usersiplist && (
                    <FormFeedback>{errors?.usersiplist?.message}</FormFeedback>
                  )}
                </Col>
                <Label className="mt-2" for="textmessage">
                  <h4>Multi-Factor Authentication (MFA) Information</h4>
                </Label>
                <Col md="12">
                  <Controller
                    id="textmessage"
                    name="textmessage"
                    control={control}
                    rules={{ required: "User Set Up Required" }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isClearable
                        options={options}
                        className="react-select"
                        classNamePrefix="select"
                        disabled={disableMFA}
                        onChange={(selectdropdown) => {
                          onChange(
                            selectdropdown ? selectdropdown.value : null
                          );
                          if (
                            selectdropdown &&
                            selectdropdown.value === "Text Message"
                          ) {
                            setShowPhoneNumber(true); // Show phone input if "Text Message" is selected
                          } else {
                            setShowPhoneNumber(false); // Hide phone input otherwise
                          }
                        }}
                        value={
                          value
                            ? options.find((option) => option.value === value)
                            : {
                                value: "User Set Up Required",
                                label: "User Set Up Required",
                              }
                        }
                      />
                    )}
                  />
                  {errors.textmessage && (
                    <FormFeedback>{errors?.textmessage?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12" sm="12" className="mb-1 mt-1">
                  <FormGroup check inline>
                    <Controller
                      id="disableMFA"
                      name="disableMFA"
                      control={control}
                      // rules={{ required: "Client Code is required" }}
                      render={({ field }) => (
                        <Input
                          type="checkbox"
                          {...field}
                          onClick={() => setDisableMFA(!disableMFA)}
                        />
                      )}
                    />
                    <Label check>Disable User MFA editing</Label>
                  </FormGroup>
                </Col>
                {showPhoneNumber && (
                  <Col md="12" sm="12" className="mb-1 mt-1">
                  <Label className="form-label" for="MFAphone">
                      Phone Number
                  </Label>
                    <Controller
                      id="MFAphone"
                      name="MFAphone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Enter phone number"
                          {...field}
                        />
                      )}
                    />
                    {errors.MFAphone && (
                      <FormFeedback>
                        {errors?.MFAphone?.message}
                      </FormFeedback>
                    )}
                  </Col>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="12" className="d-flex justify-content-end">
                <Button
                  type="reset"
                  color="secondary"
                  className="me-1"
                  onClick={() => navigate("/user-list")}
                  outline
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserForm;
