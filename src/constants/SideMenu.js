import {
  Layers,
  UserPlus
} from "react-feather";


export const sideMenu = [
  
  {
    label: "Clients",
    icon: <UserPlus/>,
    children: [
      {
        label: "Manage Client",
        to: "/client-list", 
      },
      {
        label: "Manage Predefined fees",
        to: "/fee-list",  
      },
    ],
  },

  {
    label: "Products",
    icon: <Layers />,
    children: [
      {
        label: "Manage Products",
        to: "/vendor-list",  
      },
      {
        label: "Manage Custome Searches",
        to: "/add-vendor",  
      },
      {
        label: "Manage Occupational Health ",
        to: "/add-vendor", 
      },
      {
        label: "Manage Questions",
        to: "/add-vendor", 
      },
      {
        label: "Manage Charge Tables",
        to: "/add-vendor",  
      },
      {
        label: "Manage Reports Layout",
        to: "/add-vendor",  
      },
      {
        label: "Manage Required Fields",
        to: "/add-vendor", 
      },
      {
        label: "Manage Scorecard Pro",
        to: "/add-vendor",  
      },
    ],
  },

  {
    label: "Vendors",
    to: "/vendor-list",
    icon: <UserPlus/>,
    children: [
      {
        label: "Manage Vendors",
        to: "/vendor-list",  
      },
      {
        label: "Manage Vendor Routing",
        to: "/add-vendor",  
      },
      {
        label: "Manage Contacts",
        to: "/add-vendor",  
      },
      {
        label: "Manage Jurisdiction Groups",
        to: "/add-vendor", 
      },
      {
        label: "Manage Interface Settings",
        to: "/add-vendor",  
      },
    ],
  },
];
