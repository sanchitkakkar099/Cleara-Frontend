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

function UserPermission() {
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

  const onSubmit = async (state) => {
    // const payload = {
    //   ...state,
    //   loginType: selectedOption,
    //   userStatus: userStatus,
    //   changepassword: passwordChanged,
    //   newpassword : state?.newpassword ? state?.newpassword : "",
    //   confirmpassword : state?.confirmpassword ? state?.confirmpassword : "",
    //   userAltphoneEXT : state?.userAltphoneEXT ? state?.userAltphoneEXT : "",
    //   userphoneExt : state?.userphoneExt ? state?.userphoneExt : "",
    //   textmessage : state?.textmessage === "Text Message" ? true : false,
    // };
    // console.log("payload", payload);
    // reqCreateClientUser(payload);
  };

  const handleNonAdminis = (e) => {
    // setNewpasswordDisabled(e.target.checked);
  };

  const handleAdminis = (e) => {};

  const handleManage = (e) => {};

  return (
    <div>
      <Card>
        <div style={{ backgroundColor: "#7367f0" }}>
          <CardHeader style={{ color: "white" }}>
            <CardTitle tag="h4">Permissions</CardTitle>
          </CardHeader>
        </div>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CardTitle tag="h4">User has the following permissions</CardTitle>
            <Row>
              {/* Non-Administrative permission start here */}
              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Non-Administrative</Label>
                  </FormGroup>
                </Col>
                {/* Child Checkboxes */}
                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Order Reports</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Submit Reports</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox3"
                      name="childCheckbox3"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Order QuickApp</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Reports</Label>
                  </FormGroup>
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Accounting</Label>
                  </FormGroup>
                </Col>
                {/* Child Checkboxes */}
                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Prices</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Details</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox3"
                      name="childCheckbox3"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Invoices</Label>
                  </FormGroup>
                  </Col>
              </Col>

              {/***  Administrative permission start here ***/}

              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Administrative</Label>
                  </FormGroup>
                </Col>
                {/* Child Checkboxes */}
                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Order Reports for Other Users</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Order Reports for Child Client</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox3"
                      name="childCheckbox3"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View All Reports for Other Users</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View All Reports for Child Clients</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Management Reports</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Manage Billing</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Manage Users</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Move Report</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Document Library</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Manage QuickApp</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Applicant Portal Messages</Label>
                  </FormGroup>
                </Col>
              </Col>

              {/***  Management Reports permission start here ***/}

              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleManage(e)}
                        />
                      )}
                    />
                    <Label check>Management Reports</Label>
                  </FormGroup>
                </Col>
                {/* Child Checkboxes */}
                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Decision Reports</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Hit Ratio Report</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox3"
                      name="childCheckbox3"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Product Utilization</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Resident Decision Analysis</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Resident Rent Analysis</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Status Reporting</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Time Service Report</Label>
                  </FormGroup>

                  <FormGroup check style={{ paddingBottom: "5px" }}>
                    <Controller
                      id="childCheckbox4"
                      name="childCheckbox4"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Metadata Report</Label>
                  </FormGroup>
                </Col>
              </Col>
            </Row>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#000",
                border: "none",
              }}
            ></hr>

            <CardTitle tag="h4">View Reports</CardTitle>
            <h5 style={{ marginTop: "1px" }}>
              User is allowed to view the following search results and reports
            </h5>
            <Row>
              {/* View Reports Extra settings start here */}
              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>View Reports Extra Settings</Label>
                  </FormGroup>
                </Col>

                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Allow User to Process</Label>
                  </FormGroup>

                  <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>View Vendor Notes/Messages</Label>
                  </FormGroup>
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Investigative</Label>
                  </FormGroup>

                  <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Country Criminal Records</Label>
                  </FormGroup>

                  <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>State Criminal Records</Label>
                  </FormGroup>
                  </Col>
                </Col> 
              </Col>

              {/* Credit start here */}
              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Credit</Label>
                  </FormGroup>
                </Col>

                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Credit Reports</Label>
                  </FormGroup>

                  <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Custom</Label>
                  </FormGroup>
                  </Col>
              </Col>

              {/* Identity Development start here */}
              <Col md="4" className="mb-1">
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
                          onClick={(e) => handleNonAdminis(e)}
                        />
                      )}
                    />
                    <Label check>Identity Development</Label>
                  </FormGroup>
                </Col>

                <Col
                  md="12"
                  sm="12"
                  style={{ paddingLeft: "25px" }}
                  className="mb-1 mt-1"
                >
                <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox1"
                      name="childCheckbox1"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Social Security</Label>
                  </FormGroup>

                  <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Person Search</Label>
                  </FormGroup>

                  <FormGroup check style={{paddingBottom:"5px"}}>
                    <Controller
                      id="childCheckbox2"
                      name="childCheckbox2"
                      control={control}
                      render={({ field }) => (
                        <Input type="checkbox" {...field} />
                      )}
                    />
                    <Label check>Custom</Label>
                  </FormGroup>
                </Col>
                 
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserPermission;
