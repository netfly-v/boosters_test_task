import axios from 'axios';
import {API_URL} from '../constants/common';

export const reportsAPI = {
  getTotalReports(date?: string, iso?: string) {
    return axios
      .get(`${API_URL}/reports/total${date ? `?date=${date}` : ''}${iso ? `${date ? '&' : '?'}iso=${iso}` : ''}`, {
        withCredentials: false,
      })
      .then((response) => response.data.data);
  },
};
