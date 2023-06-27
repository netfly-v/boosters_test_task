import axios from 'axios';
import {API_URL} from '../constants/common';

export const regionsAPI = {
  getRegions() {
    return axios
      .get(`${API_URL}/regions`, {
        withCredentials: false,
      })
      .then((response) => response.data);
  },
};
