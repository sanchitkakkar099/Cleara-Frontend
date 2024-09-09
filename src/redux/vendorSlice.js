import { createSlice } from "@reduxjs/toolkit";

const initState = {
    vendorList:[],
    vendorView:null,
    vendorEdit:null,
    vendorAll:[],
    vendorDropdown: [],
};

export const vendorSlice = createSlice({
      name : "vendor",
      initialState: initState,
      reducers: {
        getVendor: (state,{payload}) => {
            state.vendorList = payload;
        },
        setVendorView: (state,{payload}) => {
            state.vendorView = payload;
        },
        setVendorEdit: (state,{payload}) => {
            state.vendorEdit = payload;
        },
        setVendor: (state,{payload}) => {
            state.vendorAll = payload;
        },
        setVendorDropdown:(state,{payload}) => {
            state.vendorDropdown = payload;
        },
      }
})

export const {
    getVendor,
    setVendorView,
    setVendorEdit,
    setVendor,
    setVendorDropdown
} = vendorSlice.actions;

export default vendorSlice.reducer;