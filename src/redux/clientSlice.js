import { createSlice } from "@reduxjs/toolkit";

const initState = {
    clientList:[],
    clientView:null,
    clientEdit:null,
    clientAll:[],
    clientDropdown: [],
};

export const clientSlice = createSlice({
      name : "client",
      initialState: initState,
      reducers: {
        getClient: (state,{payload}) => {
            state.clientList = payload;
        },
        setClientView: (state,{payload}) => {
            state.clientView = payload;
        },
        setClientEdit: (state,{payload}) => {
            state.clientEdit = payload;
        },
        setClient: (state,{payload}) => {
            state.clientAll = payload;
        },
        setClientDropdown:(state,{payload}) => {
            state.clientDropdown = payload;
        },
      }
})

export const {
    getClient,
    setClientView,
    setClientEdit,
    setClient,
    setClientDropdown
} = clientSlice.actions;

export default clientSlice.reducer;