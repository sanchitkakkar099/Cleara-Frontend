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
import { setClientDropdown, setClientEdit } from "../../redux/clientSlice";
import { useCreateClientMutation, useClientByIdQuery } from "../../service";
function ClientForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const [reqCreateClient, resCreateClient] = useCreateClientMutation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "GB" },
    { name: "Australia", code: "AU" },
    { name: "India", code: "IN" },
    // Add more countries as needed
  ];
  console.log("welcome to clientForm");
  console.log("locationstate", locationState);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm();

  const resclientById = useClientByIdQuery(locationState?.clientId, {
    skip: !locationState?.clientId,
  });

  console.log("resclientById", resclientById);

  useEffect(() => {
    if (resclientById?.isSuccess && resclientById?.data?.data) {
      const childTestId = resclientById?.data?.data?.childTestId?.map((el) => ({
        label: el?.name,
        value: el?._id,
      }));
      const services = resclientById?.data?.data?.service.map((item) => item);
      reset({
        ...resclientById?.data?.data,
        clientstatus: {
          label:
            resclientById?.data?.data?.clientstatus === "Inactive"
              ? "Inactive"
              : "active",
          value:
            resclientById?.data?.data?.clientstatus === "Inactive"
              ? "Inactive"
              : "active",
        },
        service: resclientById?.data?.data?.service?.map((item) => ({
          label: item,
          value: item,
        })),
        childTestId,
      });
      dispatch(
        setClientEdit({
          ...resclientById.data.data,
          clientstatus: {
            label:
              resclientById?.data?.data?.clientstatus === "Inactive"
                ? "Inactive"
                : "active",
            value:
              resclientById?.data?.data?.clientstatus === "Inactive"
                ? "Inactive"
                : "active",
          },
          service: resclientById?.data?.data?.service?.map((item) => ({
            label: item,
            value: item,
          })),
          childTestId,
        })
      );
    }
  }, [resclientById]);

  useEffect(() => {
    if (resCreateClient?.isSuccess) {
      console.log("resCreateClient", resCreateClient?.data?.message);
      toast.success(resCreateClient?.data?.message, {
        position: "top-center",
        duration: 3000,
      });
      navigate("/client-list");
    }
  }, [resCreateClient?.isSuccess]);

  const handleCategoryChange = async (selectedOption) => {};

  const onSubmit = async (state) => {
    console.log("state Data", state);

    const payload = {
      ...state,
      clientstatus: state?.clientstatus?.value,
      service: state?.service?.map((item) => item?.value),
    };
    console.log("payload", payload);
    reqCreateClient(payload);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Card>
        <Row>
          <Col md="6">
            <CardHeader>
              <CardTitle tag="h4">Client Information</CardTitle>
            </CardHeader>
          </Col>
          <Col md="6">
            <CardHeader>
              <CardTitle tag="h4">Contact Information</CardTitle>
            </CardHeader>
          </Col>
        </Row>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="cname">
                  Company Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="cname"
                  name="cname"
                  control={control}
                  rules={{ required: "Company name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Company Name"
                      {...field}
                      name="cname"
                    />
                  )}
                />
                {errors?.cname && (
                  <FormFeedback>{errors?.cname?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="name">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="name"
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Full name"
                      {...field}
                      name="name"
                    />
                  )}
                />
                {errors?.name && (
                  <FormFeedback>{errors?.name?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="pcompany">
                  Parent Company
                </Label>
                <Controller
                  id="pcompany"
                  name="pcompany"
                  control={control}
                  // rules={{ required: "Parent company is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Parent Company"
                      {...field}
                      name="pcompany"
                    />
                  )}
                />
                {errors?.pcompany && (
                  <FormFeedback>{errors?.pcompany?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
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
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Inqname">
                  Inquiry Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="Inqname"
                  name="Inqname"
                  control={control}
                  rules={{ required: "Inquiry name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Parent Company"
                      {...field}
                      name="Inqname"
                    />
                  )}
                />
                {errors?.Inqname && (
                  <FormFeedback>{errors?.Inqname?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="clientphone">
                  Phone number
                </Label>
                <Controller
                  id="clientphone"
                  name="clientphone"
                  control={control}
                  // rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                      name="clientphone"
                    />
                  )}
                />
                {errors?.clientphone && (
                  <FormFeedback>{errors?.clientphone?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <FormGroup check inline>
                  <Input type="checkbox" />
                  <Label check>Substitute End User</Label>
                  <h6>
                    Note that enabling this option will require a value be
                    entered at order time.
                  </h6>
                </FormGroup>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Altclientphone">
                  Alt number
                </Label>
                <Controller
                  id="Altclientphone"
                  name="Altclientphone"
                  control={control}
                  // rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                      name="Altclientphone"
                    />
                  )}
                />
                {errors?.Altclientphone && (
                  <FormFeedback>{errors?.Altclientphone?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="ccode">
                  Client Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="ccode"
                  name="ccode"
                  control={control}
                  rules={{ required: "Client Code is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Client Code"
                      {...field}
                      name="ccode"
                    />
                  )}
                />
                {errors?.ccode && (
                  <FormFeedback>{errors?.ccode?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Cfaxnumber">
                  Fax Numnber
                </Label>
                <Controller
                  id="Cfaxnumber"
                  name="Cfaxnumber"
                  control={control}
                  // rules={{ required: "Fax number is required" }}
                  render={({ field }) => (
                    <Input
                      type="Cfaxnumber"
                      placeholder="Fax Number"
                      {...field}
                      name="Cfaxnumber"
                    />
                  )}
                />
                {errors?.Cfaxnumber && (
                  <FormFeedback>{errors?.Cfaxnumber?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <FormGroup>
                  <Label for="datePicker">
                    Select a Date<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="finstruction">
                  Fax Instruction
                </Label>
                <Controller
                  id="finstruction"
                  name="finstruction"
                  control={control}
                  // rules={{ required: "Fax Instruction is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Fax Instruction"
                      {...field}
                      name="finstruction"
                    />
                  )}
                />
                {errors?.finstruction && (
                  <FormFeedback>{errors?.finstruction?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="exampleText">Notes On Client</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Enter your text here"
                    rows="5"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              ></hr>
            </Row>
            <Row>
              <CardHeader>
                <CardTitle tag="h4">Owner</CardTitle>
              </CardHeader>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="cname">
                  Owner Name
                </Label>
                <Controller
                  id="cname"
                  name="cname"
                  control={control}
                  rules={{ required: "client name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="First name"
                      {...field}
                      name="cname"
                    />
                  )}
                />
                {errors?.cname && (
                  <FormFeedback>{errors?.cname?.message}</FormFeedback>
                )}
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label" for="ownerphone">
                  Phone number
                </Label>
                <Controller
                  id="ownerphone"
                  name="ownerphone"
                  control={control}
                  // rules={{ required: "Owner  Number is required" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Owner Number"
                      {...field}
                      name="ownerphone"
                    />
                  )}
                />
                {errors?.ownerphone && (
                  <FormFeedback>{errors?.ownerphone?.message}</FormFeedback>
                )}
              </Col>
              <Col md="2" className="mb-1">
                <Label className="form-label" for="clientphone">
                  EXT
                </Label>
                <Controller
                  id="clientphone"
                  name="clientphone"
                  control={control}
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                      name="clientphone"
                    />
                  )}
                />
                {errors?.clientphone && (
                  <FormFeedback>{errors?.clientphone?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="owneremail">
                  Owner Email
                </Label>
                <Controller
                  id="owneremail"
                  name="owneremail"
                  control={control}
                  rules={{ required: "Owner Email is required" }}
                  render={({ field }) => (
                    <Input
                      type="owneremail"
                      placeholder="owneremail"
                      {...field}
                      name="owneremail"
                    />
                  )}
                />
                {errors?.owneremail && (
                  <FormFeedback>{errors?.owneremail?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              ></hr>
            </Row>
            <CardHeader>
              <CardTitle tag="h4">Account Status</CardTitle>
            </CardHeader>
            <h5>
              Account Status<span style={{ color: "red" }}>*</span>
            </h5>
            <h6>
              Active accounts allow users to login Disabled accounts do not
              allow users to login.
            </h6>
            {/* <Input
               type="radio"
               id="useractive"
               name="useractive"
               value="useractive"
              //  checked="useractive"
              //  onChange={(e) => field.onChange(e.target.value)}
              />
              <label for="html">Active</label><br></br> */}
            <Row>
              <Col md="1" className="mb-1">
                <Label
                  className="form-label"
                  for="useractive"
                  style={{ display: "flex" }}
                >
                  <Input
                    type="radio"
                    name="useractive"
                    value="useractive"
                    checked={selectedOption === "useractive"}
                    onChange={handleOptionChange}
                    style={{ marginRight: "5px" }}
                  />
                  Active
                </Label>
              </Col>
              <Col md="1" className="mb-1">
                <Label
                  className="form-label"
                  for="userdisabled"
                  style={{ display: "flex" }}
                >
                  <Input
                    type="radio"
                    name="userdisabled"
                    value="userdisabled"
                    checked={selectedOption === "userdisabled"}
                    onChange={handleOptionChange}
                    style={{ marginRight: "5px" }}
                  />
                  Disabled
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="dmessage">
                  <h5>Disabled Message</h5>
                </Label>
                <h6>
                  Diabled Message will be displayed to the Client when they
                  attempt to login to the application
                </h6>
                <Controller
                  id="dmessage"
                  name="dmessage"
                  control={control}
                  // rules={{ required: "client name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Disabled Message"
                      {...field}
                      name="dmessage"
                    />
                  )}
                />
                {errors?.dmessage && (
                  <FormFeedback>{errors?.dmessage?.message}</FormFeedback>
                )}
              </Col>

              <Col md="6" className="mb-1">
                <Label className="form-label" for="dreason">
                  <h5>Disabled Reason</h5>
                </Label>
                <h6>
                  Any notes entered here are for internal use only and will not
                  be seen by this client
                </h6>
                <Controller
                  id="dreason"
                  name="dreason"
                  control={control}
                  // rules={{ required: "client name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Disabled Reason"
                      {...field}
                      name="dreason"
                    />
                  )}
                />
                {errors?.dreason && (
                  <FormFeedback>{errors?.dreason?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              ></hr>
            </Row>
            <div
              style={{
                display: "flex",
              }}
            >
              <div className="client-address">
                <Col md="6">
                  <CardHeader>
                    <h4>Physical Address</h4>
                  </CardHeader>
                </Col>
                <Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="staddress">
                      Street Address<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="staddress"
                      name="staddress"
                      control={control}
                      rules={{ required: "Street Address is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter a location"
                          {...field}
                          name="Street Address is required"
                        />
                      )}
                    />
                    {errors?.staddress && (
                      <FormFeedback>{errors?.staddress?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="addline2">
                      AddressLine 2 (optional)
                    </Label>
                    <Controller
                      id="addline2"
                      name="addline2"
                      control={control}
                      // rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="addline2"
                        />
                      )}
                    />
                    {errors?.addline2 && (
                      <FormFeedback>{errors?.addline2?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="zip">
                      Zip<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="zip"
                      name="zip"
                      control={control}
                      rules={{ required: "Zip is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="zip"
                        />
                      )}
                    />
                    {errors?.zip && (
                      <FormFeedback>{errors?.zip?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="city">
                      City<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="city"
                      name="city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="city"
                        />
                      )}
                    />
                    {errors?.city && (
                      <FormFeedback>{errors?.city?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="state">
                      State<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="state"
                      name="state"
                      control={control}
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="state"
                        />
                      )}
                    />
                    {errors?.state && (
                      <FormFeedback>{errors?.state?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="3" className="mb-1">
                    <Label className="form-label" for="country">
                      Country
                    </Label>
                    <Controller
                      id="country"
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Input type="select" {...field} name="country">
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </Input>
                      )}
                    />
                    {errors?.country && (
                      <FormFeedback>{errors?.country?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
              </div>
              <div className="client-address">
                <Row>
                  <Col md="6">
                    <CardHeader>
                      <h4>Billing Address</h4>
                    </CardHeader>
                  </Col>
                  <Row>
                    <Col md="6">
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Same as Physical address</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="staddress">
                      Street Address<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="staddress"
                      name="staddress"
                      control={control}
                      rules={{ required: "Street Address is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter a location"
                          {...field}
                          name="Street Address is required"
                        />
                      )}
                    />
                    {errors?.staddress && (
                      <FormFeedback>{errors?.staddress?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="addline2">
                      AddressLine 2 (optional)
                    </Label>
                    <Controller
                      id="addline2"
                      name="addline2"
                      control={control}
                      // rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="addline2"
                        />
                      )}
                    />
                    {errors?.addline2 && (
                      <FormFeedback>{errors?.addline2?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="zip">
                      Zip<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="zip"
                      name="zip"
                      control={control}
                      rules={{ required: "Zip is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="zip"
                        />
                      )}
                    />
                    {errors?.zip && (
                      <FormFeedback>{errors?.zip?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="city">
                      City<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="city"
                      name="city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="city"
                        />
                      )}
                    />
                    {errors?.city && (
                      <FormFeedback>{errors?.city?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="2" className="mb-1">
                    <Label className="form-label" for="state">
                      State<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="state"
                      name="state"
                      control={control}
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                          name="state"
                        />
                      )}
                    />
                    {errors?.state && (
                      <FormFeedback>{errors?.state?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="3" className="mb-1">
                    <Label className="form-label" for="country">
                      Country
                    </Label>
                    <Controller
                      id="country"
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Input type="select" {...field} name="country">
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </Input>
                      )}
                    />
                    {errors?.country && (
                      <FormFeedback>{errors?.country?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                <Row>
                <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Altclientphone">
                  Attn
                </Label>
                <Controller
                  id="Altclientphone"
                  name="Altclientphone"
                  control={control}
                  // rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder=""
                      {...field}
                      name="Altclientphone"
                    />
                  )}
                />
                {errors?.Altclientphone && (
                  <FormFeedback>{errors?.Altclientphone?.message}</FormFeedback>
                )}
              </Col>
                </Row>
              </div>
            </div>
            <Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              ></hr>
            </Row>
            <Row>
            <Col md="6">
                  <CardHeader>
                    <h4>Product Selection Instructions</h4>
                  </CardHeader>
                </Col>
            </Row>
            <Row>
            <Col md="6">
            <FormGroup check inline>
                  <Input type="checkbox" />
                  <Label check>Display Product Selection Instruction</Label>
                </FormGroup>
                </Col>
            </Row>
            <br></br>
            <h5>Product Selection Instructions</h5>
            <Row>
              <Col md="12" className="d-flex justify-content-end">
                <Button
                  type="reset"
                  color="secondary"
                  className="me-1"
                  onClick={() => navigate("/client-list")}
                  outline
                >
                  Back
                </Button>
                <Button
                  type="reset"
                  color="danger"
                  className="me-1"
                  onClick={() => reset()}
                  outline
                >
                  Reset
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default ClientForm;
