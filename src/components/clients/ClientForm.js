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
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Typeahead } from "react-bootstrap-typeahead";

function ClientForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: locationState } = location;
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const [reqCreateClient, resCreateClient] = useCreateClientMutation();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedDate, setSelectedDate] = useState("");
  const [adressCheck, setAdressCheck] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "GB" },
    { name: "Australia", code: "AU" },
    { name: "India", code: "IN" },
    // Add more countries as needed
  ];
  const Affiliated = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "No", value: "No" },
    { label: "No", value: "No" },
    { label: "No", value: "No" },

  ];
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

  if(adressCheck){
    const fields = ["street", "addressLine2", "zip", "city", "state", "country"];
    fields.forEach((field) => {
      setValue(`billing_address.${field}`, watch(`physical_address.${field}`));
    }); 
  }

  const handleCategoryChange = async (selectedOption) => {};

  const onSubmit = async (state) => {
    console.log("state Data", state);

  };

  const handleSameAsPhysical = (e) => {
    setAdressCheck(e.target.checked);
    const fields = ["street", "addressLine2", "zip", "city", "state", "country"];
    fields.forEach((field) => {
      const physicalValue = e.target.checked ? getValues(`physical_address.${field}`) : '';
      setValue(`billing_address.${field}`, physicalValue);
    }); 
  }


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              {/*  Client information start*/}
              <Col md="6" className="mb-1">
                <div className="h4 mb-2">Client Information</div>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="cname">
                    Company Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Controller
                    id="companyName"
                    name="companyName"
                    control={control}
                    rules={{ required: "Company name is required" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Company Name"
                        {...field}
                      />
                    )}
                  />
                  {errors?.companyName && (
                    <FormFeedback>{errors?.companyName?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12" className="mb-1">
                <Label className="form-label" for="pcompany">
                  Parent Company
                </Label>
                <Controller
                  id="parentCompany"
                  name="parentCompany"
                  control={control}
                  // rules={{ required: "Parent company is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Parent Company"
                      {...field}
                    />
                  )}
                />
                {errors?.parentCompany && (
                  <FormFeedback>{errors?.parentCompany?.message}</FormFeedback>
                )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                <Label className="form-label" for="Inqname">
                  Inquiry Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="inquiryName"
                  name="inquiryName"
                  control={control}
                  rules={{ required: "Inquiry name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Parent Company"
                      {...field}
                    />
                  )}
                />
                {errors?.inquiryName && (
                  <FormFeedback>{errors?.inquiryName?.message}</FormFeedback>
                )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                <FormGroup check inline>
                  <Controller
                    id="substitute"
                    name="substitute"
                    control={control}
                    rules={{ required: "Client Code is required" }}
                    render={({ field }) => (
                    <Input type="checkbox"
                    {...field} 
                    /> 
                    )}
                  />
                  <Label check>Substitute End User</Label>
                  <h6>
                    Note that enabling this option will require a value be
                    entered at order time.
                  </h6>
                </FormGroup>
                </Col>
                <Col md="12" sm="12" className="mb-1">
                <Label className="form-label" for="clintCode">
                  Client Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Controller
                  id="clintCode"
                  name="clintCode"
                  control={control}
                  rules={{ required: "Client Code is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Client Code"
                      {...field}
                    />
                  )}
                />
                {errors?.clintCode && (
                  <FormFeedback>{errors?.clintCode?.message}</FormFeedback>
                )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                  <Label for="datePicker">
                    Select a Date<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Controller
                    id="date"
                    name="date"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                    <Input
                      type="date"
                      name="date"
                      id="datePicker"
                      value={selectedDate}
                      onChange={handleDateChange}
                      {...field}
                    />  
                    )}
                  />
                  {errors?.date && (
                    <FormFeedback>{errors?.date?.message}</FormFeedback>
                  )}
                </Col>
                <Col md="12">
                  <Label for="exampleText">Notes On Client</Label>
                  <Controller
                    id="clientNote"
                    name="clientNote"
                    control={control}
                    render={({ field }) => (
                      <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="Enter your text here"
                      rows="5"
                    />  
                    )}
                  />
                  {errors?.clientNote && (
                    <FormFeedback>{errors?.clientNote?.message}</FormFeedback>
                  )}
                </Col>
              </Col>
              {/*  Client information end*/}
              {/*  contact information start*/}
              <Col md="6" className="mb-1">
                <div className="h4 mb-2">Contact Information</div>
                <Col md="12" className="mb-1">
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
                <Row>
                <Col md="8" sm="12" className="mb-1">
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
                    />
                  )}
                />
                {errors?.clientphone && (
                  <FormFeedback>{errors?.clientphone?.message}</FormFeedback>
                )}
                </Col>
                <Col md="4" className="mb-1">
                <Label className="form-label" for="clientphone">
                  EXT
                </Label>
                <Controller
                  id="clientEXT"
                  name="clientEXT"
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
                {errors?.clientEXT && (
                  <FormFeedback>{errors?.clientEXT?.message}</FormFeedback>
                )}
                </Col>
                </Row>
                <Row>
                <Col md="8" sm="12" className="mb-1">
                <Label className="form-label" for="Altclientphone">
                  Alt number
                </Label>
                <Controller
                  id="altClientphone"
                  name="altClientphone"
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
                {errors?.altClientphone && (
                  <FormFeedback>{errors?.altClientphone?.message}</FormFeedback>
                )}
                </Col>
                <Col md="4" className="mb-1">
                <Label className="form-label" for="altClientEXT">
                  EXT
                </Label>
                <Controller
                  id="altClientEXT"
                  name="altClientEXT"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      {...field}
                    />
                  )}
                />
                {errors?.altClientEXT && (
                  <FormFeedback>{errors?.altClientEXT?.message}</FormFeedback>
                )}
                </Col>
                </Row>
                <Col md="12" sm="12" className="mb-1">
                <Label className="form-label" for="faxNumber">
                  Fax Numnber
                </Label>
                <Controller
                  id="faxNumber"
                  name="faxNumber"
                  control={control}
                  // rules={{ required: "Fax number is required" }}
                  render={({ field }) => (
                    <Input
                      type="faxNumber"
                      placeholder="Fax Number"
                      {...field}
                      name="faxNumber"
                    />
                  )}
                />
                {errors?.faxnumber && (
                  <FormFeedback>{errors?.faxnumber?.message}</FormFeedback>
                )}
                </Col>
                <Col md="12" sm="12" className="mb-1">
                <Label className="form-label" for="finstruction">
                  Fax Instruction
                </Label>
                <Controller
                  id="faxInstruction"
                  name="faxInstruction"
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
                {errors?.faxInstruction && (
                  <FormFeedback>{errors?.faxInstruction?.message}</FormFeedback>
                )}
                </Col>
              </Col>
              {/*  contact information end*/}
            </Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              ></hr>
            <Row>
              <div className="h4 mb-2">Owner</div>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="cname">
                  Owner Name
                </Label>
                <Controller
                  id="ownername"
                  name="ownername"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="First name"
                      {...field}
                      name="ownername"
                    />
                  )}
                />
                {errors?.ownername && (
                  <FormFeedback>{errors?.ownername?.message}</FormFeedback>
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
                    />
                  )}
                />
                {errors?.ownerphone && (
                  <FormFeedback>{errors?.ownerphone?.message}</FormFeedback>
                )}
              </Col>
              <Col md="2" className="mb-1">
                <Label className="form-label" for="ownerEXT">
                  EXT
                </Label>
                <Controller
                  id="ownerEXT"
                  name="ownerEXT"
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
                {errors?.ownerEXT && (
                  <FormFeedback>{errors?.ownerEXT?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="owneremail">
                  Owner Email
                </Label>
                <Controller
                  id="owneremail"
                  name="owneremail"
                  control={control}
                  // rules={{ required: "Owner Email is required" }}
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
            <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
            />
            <Row>
              <div className="h4 mb-2">Account Status</div>
              <h5>
                Account Status<span style={{ color: "red" }}>*</span>
              </h5>
              <h6>
                Active accounts allow users to login Disabled accounts do not
                allow users to login.
              </h6>
              <Col md="1" className="mb-1">
                <Label
                  className="form-label"
                  for="useractive"
                  style={{ display: "flex" }}
                >
                  <Input
                    type="radio"
                    name="Active"
                    value="Active"
                    checked={selectedOption === "Active"}
                    onChange={handleOptionChange}
                    style={{ marginRight: "5px" }}
                  />
                  Active
                </Label>
              </Col>
              <Col md="1" className="mb-1">
                <Label
                  className="form-label"
                  for="Disabled"
                  style={{ display: "flex" }}
                >
                  <Input
                    type="radio"
                    name="Disabled"
                    value="Disabled"
                    checked={selectedOption === "Disabled"}
                    onChange={handleOptionChange}
                    style={{ marginRight: "5px" }}
                  />
                  Disabled
                </Label>
              </Col>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="dmessage">
                  <h5>Disabled Message</h5>
                </Label>
                <h6>
                  Disabled Message will be displayed to the Client when they
                  attempt to login to the application
                </h6>
                <Controller
                  id="disabledMessage"
                  name="disabledMessage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Disabled Message"
                      {...field}
                    />
                  )}
                />
                {errors?.disabledMessage && (
                  <FormFeedback>{errors?.disabledMessage?.message}</FormFeedback>
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
                  id="disabledReason"
                  name="disabledReason"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Disabled Reason"
                      {...field}
                    />
                  )}
                />
                {errors?.disabledReason && (
                  <FormFeedback>{errors?.disabledReason?.message}</FormFeedback>
                )}
              </Col>
            </Row>
            </Row>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
              />
              <Row className="client-address">
                <Col md="6">
                  <div className="h4 mb-2">Physical Address</div>
                  <Col md="12" className="mb-1">
                    <Label className="form-label" for="staddress">
                      Street Address<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="physical_address.street"
                      name="physical_address.street"
                      control={control}
                      rules={{ required: "Street Address is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter a location"
                          {...field}
                        />
                      )}
                    />
                    {errors?.physical_address?.street && (
                      <FormFeedback>{errors?.physical_address?.street?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="12" className="mb-1">
                    <Label className="form-label" for="addline2">
                      AddressLine 2 (optional)
                    </Label>
                    <Controller
                      id="physical_address.addressLine2"
                      name="physical_address.addressLine2"
                      control={control}
                      // rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                        />
                      )}
                    />
                    {errors?.physical_address?.addressLine2 && (
                      <FormFeedback>{errors?.physical_address?.addressLine2?.message}</FormFeedback>
                    )}
                  </Col>
                  <Row>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="zip">
                      Zip<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="physical_address.zip"
                      name="physical_address.zip"
                      control={control}
                      rules={{ required: "Zip is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                        />
                      )}
                    />
                    {errors?.physical_address?.zip && (
                      <FormFeedback>{errors?.physical_address?.zip?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="city">
                      City<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="physical_address.city"
                      name="physical_address.city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          {...field}
                        />
                      )}
                    />
                    {errors?.physical_address?.city && (
                      <FormFeedback>{errors?.physical_address?.city?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="state">
                      State<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="physical_address.state"
                      name="physical_address.state"
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
                    {errors?.physical_address?.state && (
                      <FormFeedback>{errors?.physical_address?.state?.message}</FormFeedback>
                    )}
                  </Col>
                  </Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="country">
                      Country
                    </Label>
                    <Controller
                      id="physical_address.country"
                      name="physical_address.country"
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
                    {errors?.physical_address?.country && (
                      <FormFeedback>{errors?.physical_address?.country?.message}</FormFeedback>
                    )}
                  </Col>
                </Col>
                <Col md="6">
                <div className="h4 mb-2">Billing Address</div>
                    <Col md="12">
                      <FormGroup check inline>
                        <Input type="checkbox" onClick={(e) => handleSameAsPhysical(e)}/>
                        <Label check>Same as Physical address</Label>
                      </FormGroup>
                    </Col>
                  <Col md="12" className="mb-1">
                    <Label className="form-label" for="staddress">
                      Street Address<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="billing_address.street"
                      name="billing_address.street"
                      control={control}
                      rules={{ required: "Street Address is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter a location"
                          disabled={adressCheck}
                          {...field}
                        />
                      )}
                    />
                    {errors?.billing_address?.street && (
                      <FormFeedback>{errors?.billing_address?.street?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="12" className="mb-1">
                    <Label className="form-label" for="addline2">
                      AddressLine 2 (optional)
                    </Label>
                    <Controller
                      id="billing_address.addressLine2"
                      name="billing_address.addressLine2"
                      control={control}
                      // rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          disabled={adressCheck}
                          {...field}
                        />
                      )}
                    />
                    {errors?.billing_address?.addressLine2 && (
                      <FormFeedback>{errors?.billing_address?.addressLine2?.message}</FormFeedback>
                    )}
                  </Col>
                <Row>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="zip">
                      Zip<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="billing_address.zip"
                      name="billing_address.zip"
                      control={control}
                      rules={{ required: "Zip is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          disabled={adressCheck}
                          {...field}
                        />
                      )}
                    />
                    {errors?.billing_address?.zip && (
                      <FormFeedback>{errors?.billing_address?.zip?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="city">
                      City<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="billing_address.city"
                      name="billing_address.city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          disabled={adressCheck}
                          {...field}
                        />
                      )}
                    />
                    {errors?.billing_address?.city && (
                      <FormFeedback>{errors?.billing_address?.city?.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="4" className="mb-1">
                    <Label className="form-label" for="state">
                      State<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Controller
                      id="billing_address.state"
                      name="billing_address.state"
                      control={control}
                      rules={{ required: "State is required" }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder=""
                          disabled={adressCheck}
                          {...field}
                        />
                      )}
                    />
                    {errors?.billing_address?.state && (
                      <FormFeedback>{errors?.billing_address?.state?.message}</FormFeedback>
                    )}
                  </Col>
                </Row>
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="country">
                      Country
                    </Label>
                    <Controller
                      id="billing_address.country"
                      name="billing_address.country"
                      control={control}
                      render={({ field }) => (
                        <Input type="select" {...field} name="country"  disabled={adressCheck}>
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </Input>
                      )}
                    />
                    {errors?.billing_address?.country && (
                      <FormFeedback>{errors?.billing_address?.country?.message}</FormFeedback>
                    )}
                  </Col>
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
                
              </Col>
              </Row>
              <div className="client-address">
                
              </div>
            <hr
                style={{
                  height: "1px",
                  backgroundColor: "#000",
                  border: "none",
                }}
            />
            <Row>
            <Col md="6">
              <div className="h4 mb-2">Product Selection Instructions</div>
              <FormGroup check inline>
                <Controller
                  id="displayProductSection"
                  name="displayProductSection"
                  control={control}
                  render={({ field }) => (
                    <Input type="checkbox"
                    defaultValue={false}
                    {...field} 
                    />  
                  )}
                />
                {errors?.displayProductSection && (
                  <FormFeedback>{errors?.displayProductSection?.message}</FormFeedback>
                )}
                <Label check>Display Product Selection Instruction</Label>
              </FormGroup>
            </Col>
            <br></br>
            <h5>Product Selection Instructions</h5>
            <Col md="12" className="mb-1">
              <Controller
                id="productSection"
                name="productSection"
                control={control}
                render={({ field }) => (
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={(val) => setEditorState(val)}
                    {...field}
                    toolbar={{
                      fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 35],
                      },                      
                    }}
                  />
                )}
              />
              {errors?.productSection && (
                <FormFeedback>{errors?.productSection?.message}</FormFeedback>
              )}
            </Col>
            </Row>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#000",
                border: "none",
              }}
            />
            <Row>
            <br></br>
            <Col md='6' >
              <h4>Product Selection Instructions</h4>
              <h5>Preferred URI</h5>
              <p>The data </p>
              <Controller
                id="affiliated"
                name="affiliated"
                control={control}
                render={({ field }) => (
                  <Typeahead
                      allowNew={false}
                      id="custom-selections-example"
                      labelKey={"label"}
                      options={Affiliated && Array.isArray(Affiliated) &&
                        Affiliated?.length > 0 ? Affiliated :
                        []}
                      placeholder="Search tags..."
                      {...field}
                  />
                )}
              />
              {errors?.affiliated && (
                <FormFeedback>{errors?.affiliated?.message}</FormFeedback>
              )}
            </Col>
            <Col md='6' >
              <FormGroup check inline className="mt-3">
              <Controller
                id="invoice"
                name="invoice"
                control={control}
                render={({ field }) => (
                <Input type="checkbox"
                defaultValue={false}
                {...field} 
                />
                  
                )}
              />
              {errors?.invoice && (
                <FormFeedback>{errors?.invoice?.message}</FormFeedback>
              )}
              <Label check>Do Not Invoice</Label>
              </FormGroup>
              <p>If this is checked, the data associated with the Preferred URL will not be displayed in invoices. Instead, then CRA information will be displayed</p>
            </Col>
            </Row>
            <Row>
              <Col md="12" className="d-flex justify-content-end">
                <Button
                  type="reset"
                  color="secondary"
                  className="me-1"
                  onClick={() => navigate("/client-list")}
                  outline
                >
                  Cancel
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

export default ClientForm;
