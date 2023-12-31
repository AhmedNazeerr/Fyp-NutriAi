import axios from "axios";
import {
  getHistoryFailed,
  getHistoryStart,
  getHistorySuccess,
  getListHistoryFailed,
  getListHistoryStart,
  getListHistorySucess,
} from "../../redux/historySlice";
import { DOMAIN } from "../../utils/settings/config";

export const createHistoryUser = async (dispatch, params) => {
  dispatch(getHistoryStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/history`, params);
    dispatch(getHistorySuccess());
  } catch (err) {
    dispatch(getHistoryFailed(err));
  }
};
export const updateHistory = async (id, updatedData) => {
  try {
    await axios.put(`${DOMAIN}/api/v1/history/${id}`, updatedData);
  } catch (err) {
    // Handle error if needed
    console.error("Error updating history:", err);
    throw err;
  }
};
export const getListHistoryUser = async (dispatch, params = "") => {
  dispatch(getListHistoryStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/history/${params}`);
    dispatch(getListHistorySucess(response.data));
  } catch (err) {
    dispatch(getListHistoryFailed());
  }
};
