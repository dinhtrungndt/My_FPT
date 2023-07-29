import {Dialog} from 'react-native-paper';
import AxiosInstance from '../helper/Axiosinstance';

export const getNews = async () => {
  const response = await AxiosInstance().get('/news');
  console.log(response);
  return response.data;
};
