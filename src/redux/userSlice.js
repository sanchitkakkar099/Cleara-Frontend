import { createSlice } from "@reduxjs/toolkit";

const initState = {
    userList:[],
    userView:null,
    userEdit:null,
    userAll:[],
    userDropdown: [],
};

export const userSlice = createSlice({
      name : "user",
      initialState: initState,
      reducers: {
        getUser: (state,{payload}) => {
            state.userList = payload;
        },
        setUserView: (state,{payload}) => {
            state.userView = payload;
        },
        setUserEdit: (state,{payload}) => {
            state.userEdit = payload;
        },
        setUser: (state,{payload}) => {
            state.userAll = payload;
        },
        setUserDropdown:(state,{payload}) => {
            state.userDropdown = payload;
        },
      }
})

export const {
    getUser,
    setUserView,
    setUserEdit,
    setUser,
    setUserDropdown
} = userSlice.actions;

export default userSlice.reducer;