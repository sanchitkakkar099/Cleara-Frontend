import { lazy } from "react";
import LoginComponent from "../components/auth/Login";
import InstallApp from "../components/installApp/InstallApp";
import AppApproval from "../components/appApproval/Approvalreq";

/********** Cleara Dashboard ********/ 

import ClientList from "../components/clients/ClientList";
import ClientForm from "../components/clients/ClientForm";

import VendorList from "../components/vendors/VendorList";
import VendorForm from "../components/vendors/VendorForm";


const OrderList = lazy(() => import("../components/order/Orderlist"));
const ApprovalForm = lazy(() => import("../components/appApproval/ApprovalForm"));

export const privateRoutes = [
  {path: "/order-list", Component: OrderList },
  {path: "/install-app", Component: InstallApp },
  {path:"/approval-requests", Component:AppApproval},
  {path:"/appproval-form", Component:ApprovalForm},
  {path:"/appproval-form", Component:ApprovalForm},

  /****** Cleara routes  *****/ 
  {path:"/vendor-list",Component:VendorList},
  {path:"/vendor-form",Component:VendorForm},

  {path:"/client-list",Component:ClientList},
  {path: "client-form",Component:ClientForm}
];


export const publicRoutes = [
  { path: "/login", Component: LoginComponent },
]
