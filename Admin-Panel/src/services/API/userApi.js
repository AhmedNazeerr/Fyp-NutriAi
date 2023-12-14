import axios from "axios";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from "../../redux/userSlice";
import { DOMAIN } from "../../utils/settings/config";

// Example in userApi.js
export const getListUser = async (dispatch, accessToken, searchQuery = "") => {
  console.log('Fetching users...');
  dispatch(getUserStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/users/`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
      params: {
        search: searchQuery,
      },
    });
    console.log('Users fetched successfully:', response.data);
    dispatch(getUserSuccess(response.data));
  } catch (err) {
    console.error('Error fetching users:', err);
    dispatch(getUserFailed(err));
  }
};


export const updateUser = async (dispatch, id, accessToken, user) => {
  dispatch(getUserStart());
  try {
    await axios.put(`${DOMAIN}/api/v1/users/${id}`, user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserSuccess());
  } catch (err) {
    dispatch(getUserFailed(err));
  }
};

export const deleteUser = async (dispatch, id, accessToken) => {
  dispatch(deleteUserStart());
  try {
    console.log('Deleting user with ID:', id);
    const response = await axios.delete(`${DOMAIN}/api/v1/users/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    console.log('User deleted successfully. API Response:', response);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    console.error('Error deleting user:', err);
    dispatch(deleteUserFailed(err));
  }
};




