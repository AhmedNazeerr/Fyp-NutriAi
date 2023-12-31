import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      isUser: [],
      isFetching: false,
      error: false,
    },
    deleteUser: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.isUser = action.payload;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.deleteUser.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.isSuccess = true;
    
      // Remove the deleted user from the state
      state.users.isUser = state.users.isUser.filter(user => user.id !== action.payload);
    },
    deleteUserFailed: (state) => {
      state.deleteUser.isFetching = false;
      state.deleteUser.error = true;
    },
  },
});


export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
