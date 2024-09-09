import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const auth = localStorage.getItem("auth");
const user = JSON.parse(auth);

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;           
                                      
export const authApi = createApi({
  tagTypes: ["auth"],
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({                       
    loginAuth: builder.mutation({
      query: (payload) => ({
        url: "admin/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],                  
    }),                          
    loginAsAdmin: builder.mutation({                      
      query: (payload) => ({
        url: "admin/staff/login/admin",      
        method: "POST",
        body: payload,
      }),
      providesTags: ["auth"], 
    }),
  }),
});
export const { useLoginAuthMutation, useLoginAsAdminMutation } = authApi;

export const ordersApi = createApi({
  tagTypes: ["orders"],
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      shopifyOrders: builder.query({
      query: () => ({
        url: "orders/list",       
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});
export const { useShopifyOrdersQuery } = ordersApi;

export const approvalApi = createApi({
  tagTypes: ["appApproval"],
  reducerPath: "approvalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      shopifyAppapproval: builder.query({
      query: () => ({
        url: "approval/request",       
        method: "GET",
      }),
      providesTags: ["appApproval"],
    }),
    changeApproval: builder.mutation({
      query:(payload) => ({
        url:"appapproval/change",
        method:"POST",
        body:payload,
      }),
      providesTags:["appApproval"],
    }),
  }),
});
export const { useShopifyAppapprovalQuery,useChangeApprovalMutation } = approvalApi;

export const installappApi = createApi({
  tagTypes: ["appHistory"],
  reducerPath: "installappApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      appInstallData: builder.query({
      query: () => ({
        url: "installapp/list",       
        method: "GET",
      }),
      providesTags: ["installapp"],
    }),
  }),
});
export const { useAppInstallDataQuery } = installappApi;



//************ Cleara Dashboard api **********/


export const vendorApi = createApi({
  tagTypes: ["vendor"],
  reducerPath: "vendor",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      if(getState()?.authState?.userToken){
        headers.set('Authorization', getState()?.authState?.userToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createVendor : builder.mutation({
      query:(payload) => ({
        url:"vendor",
        method:"POST",
        body:payload,
      }),
      providesTags:["vendor"],
    }),
    vendorList: builder.mutation({
      query: (payload) => ({
        url: "vendor/list",
        method: "POST",
        body: payload,
      }),
      providesTags: ["vendor"],
    }),
    vendorById: builder.query({
      query: (id) => ({
        url: `vendor/byid/${id}`,
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
    vendorDropdown: builder.query({
      query: () => ({
        url: "vendor/dropdown",
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `vendor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vendor"],
    }),
  })
})

export const {
  useCreateVendorMutation,
  useVendorListMutation,
  useVendorByIdQuery,
  useVendorDropdownQuery,
  useDeleteVendorMutation
}  = vendorApi;


/******* Client API  ******/ 

export const clientApi = createApi({
  tagTypes: ["client"],
  reducerPath: "client",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      if(getState()?.authState?.userToken){
        headers.set('Authorization', getState()?.authState?.userToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createClient : builder.mutation({
      query:(payload) => ({
        url:"client",
        method:"POST",
        body:payload,
      }),
      providesTags:["client"],
    }),
    clientList: builder.mutation({
      query: (payload) => ({
        url: "client/list",
        method: "POST",
        body: payload,
      }),
      providesTags: ["client"],
    }),
    clientById: builder.query({
      query: (id) => ({
        url: `client/byid/${id}`,
        method: "GET",
      }),
      providesTags: ["client"],
    }),
    clientDropdown: builder.query({
      query: () => ({
        url: "client/dropdown",
        method: "GET",
      }),
      providesTags: ["client"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
  })
})

export const {
  useCreateClientMutation,
  useClientListMutation,
  useClientByIdQuery,
  useClientDropdownQuery,
  useDeleteClientMutation
}  = clientApi;