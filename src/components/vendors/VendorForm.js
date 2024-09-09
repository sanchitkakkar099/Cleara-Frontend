import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setVendorDropdown,setVendorEdit } from "../../redux/vendorSlice";
import { useCreateVendorMutation,useVendorByIdQuery } from "../../service";
function VendorForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state: locationState } = location;
    const dispatch = useDispatch(); 
    const [passwordShow, setPasswordShow] = useState(false);
    const [reqCreateVendor, resCreateVendor] = useCreateVendorMutation();
    console.log("welcome to vendorForm");
   console.log("locationstate",locationState);
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      setError,
    } = useForm();
  
    const resvendorById = useVendorByIdQuery(locationState?.vendorId, {
      skip: !locationState?.vendorId,
    });
  
    console.log("resvendorById",resvendorById);
  
    useEffect(() => {
      if (resvendorById?.isSuccess && resvendorById?.data?.data) {
        const childTestId = resvendorById?.data?.data?.childTestId?.map(el => ({
          label: el?.name,
          value: el?._id
        }));
        const services = resvendorById?.data?.data?.service.map(item => item)
        reset({
          ...resvendorById?.data?.data,
          vendorstatus: {
            label: resvendorById?.data?.data?.vendorstatus === "Inactive"?"Inactive" : "active",
            value: resvendorById?.data?.data?.vendorstatus === "Inactive"?"Inactive" : "active",
          },
          service:resvendorById?.data?.data?.service?.map((item) => ({
            label: item,
            value: item,
          })),
          childTestId,
        });
        dispatch(setVendorEdit({
          ...resvendorById.data.data,
          vendorstatus: {
            label: resvendorById?.data?.data?.vendorstatus === "Inactive"?"Inactive" : "active",
            value: resvendorById?.data?.data?.vendorstatus === "Inactive"?"Inactive" : "active",
          },
          service: resvendorById?.data?.data?.service?.map((item) => ({
            label: item,
            value: item,
          })),
          childTestId,
        }))
      }
    },[resvendorById]);
  
    useEffect(() => {
      if (resCreateVendor?.isSuccess) {
        console.log("resCreateVendor",resCreateVendor?.data?.message)
        toast.success(resCreateVendor?.data?.message, {
          position: "top-center",
          duration: 3000,
        });
        navigate("/vendor-list");
      }
    }, [resCreateVendor?.isSuccess]);
  
    const handleCategoryChange = async (selectedOption) => {
    };
  
    const onSubmit = async (state) => {
      console.log("state Data", state);
  
      const payload = {
        ...state,
        vendorstatus: state?.vendorstatus?.value,
        service: state?.service?.map( (item) => item?.value)
      };
    console.log("payload",payload);
      reqCreateVendor(payload);

    };


  return (
    <div>
    <Card>
      <CardHeader>
      <CardTitle tag="h4"> {locationState?.isEdit ? " Edit Vendor" : "Add Vendor"}</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="fname">
                First Name
              </Label>
              <Controller
                id="fname"
                name="fname"
                control={control}
                rules={{ required: "vendor name is required" }}
                render={({ field }) => (
                  <Input type="text" placeholder="First name" {...field}
                name="fname"
                 />
                )}
              />
              {errors?.fname && (
                <FormFeedback>{errors?.fname?.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="lname">
                Last Name
              </Label>
              <Controller
                id="lname"
                name="lname"
                control={control}
                rules={{ required: "last name is required" }}
                render={({ field }) => (
                  <Input type="text" placeholder="Last name" {...field}
                name="lname"
                 />
                )}
              />
              {errors?.lname && (
                <FormFeedback>{errors?.lname?.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
                <Label className="form-label" for="email">
                  Email
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
              {locationState?.isEdit?null:(
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="password-creation">
                  Password
                </Label>
                <div className="input-group-merge input-group">
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field }) => (
                      <Input
                        placeholder="············"
                        id="password"
                        type={passwordShow ? "text" : "password"}
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
                        stroke-width="2"
                        stroke-linecap="round"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </span>
                </div>
                {errors?.password && (
                  <FormFeedback>
                    {errors?.password?.message}
                  </FormFeedback>
                )}
              </Col>)}
            <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="vendorphone">
                  Vendor phone
                </Label>
                <Controller
                  id="vendorphone"
                  name="vendorphone"
                  control={control}
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <Input type="number" placeholder="Phone Number" {...field}
                      name="vendorphone"
                    />
                  )}
                />
                {errors?.vendorphone && (
                  <FormFeedback>{errors?.vendorphone?.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" sm="12" className="mb-1">
              <Label for="vendorstatus">Vendor Status</Label>
              <Controller
                id="vendorstatus"
                name="vendorstatus"
                control={control}
                rules={{ required: "Vendor status is required" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    isClearable
                    options={[
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "Inactive" },
                    ]}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      onChange(selectedOption);
                      // handleCategoryChange(selectedOption); // Call the handleCategoryChange function on dropdown change
                    }}
                    value={value ? value : null}
                  />
                )}
              />
              {errors.vendorstatus && (
                <FormFeedback>{errors?.vendorstatus?.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label for="service">Select Services</Label>
              <Controller
                id="service"
                name="service"
                control={control}
                rules={{ required: "Service is required" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    isClearable
                    isMulti
                    options={[
                      { label: "service1", value: "service1" },
                      { label: "service2", value: "service2" },
                      { label: "service3", value: "service3" },
                      { label: "service4", value: "service4" },
                      { label: "service5", value: "service5" },
                      { label: "service6", value: "service6" },
                      { label: "service7", value: "service7" },
                      { label: "service8", value: "service8" },
                      { label: "service9", value: "service9" },
                      { label: "service10", value: "service10" },
                      { label: "service11", value: "service11" },
                    ]}
                    className="react-select"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      onChange(selectedOption);
                    //   handleCategoryChange(selectedOption); 
                    }}
                    value={value ? value : null}
                  />
                )}
              />
              {errors.service && (
                <FormFeedback>{errors?.service?.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="12" className="d-flex justify-content-end">
              <Button
                type="reset"
                color="secondary"
                className="me-1"
                onClick={() => navigate("/vendor-list")}
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
  )
}

export default VendorForm
