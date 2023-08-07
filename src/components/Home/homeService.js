import AxiosInstance from '../helper/Axiosinstance';

// lấy danh sách tin tức
export const getNews = async () => {
  const response = await AxiosInstance().get('/news');
  // console.log(response);
  return response.data;
};

// lấy danh sách nổi bật
export const getNoiBat = async () => {
  const response = await AxiosInstance().get('/noibat');
  // console.log(response);
  return response.data;
};

// lấy chi tiết danh sách Sự kiện sắp tới
export const getNewsDetail = async id => {
  const response = await AxiosInstance().get(`/news/get-news-by-id/${id}`);
  // console.log(response);
  return response.data;
};

// lấy chi tiết danh sách nổi bật
export const getNoiBatDetail = async id => {
  const response = await AxiosInstance().get(`/noibat/get-noibat-by-id/${id}`);
  // console.log(response);
  return response.data;
};

// lấy danh sách lịch học
export const getMonHoc = async () => {
  const response = await AxiosInstance().get('/subject');
  console.log(response);
  return response.data;
};

// Update thông tin cá nhân
export const addProject = async id => {
  const response = await AxiosInstance().put(`/login/update-login/${id}`);
  return response.data;
};

// cập nhập ảnh đại diện
export const uploadImage = async form => {
  const response = await AxiosInstance('multipart/form-data').post(
    'login/upload-img-login',
    form,
  );
  console.log(response);
  return response;
};

// lấy người dùng
export const getChitietUser = async id => {
  const response = await AxiosInstance().get(`/login/get-login-by-id/${id}`);
  console.log(response);
  return response.data;
};

// lấy kỳ học
export const GetKyHoc = async () => {
  const response = await AxiosInstance().get('/bangdiem');
  console.log(response);
  return response.data;
};

// lấy lịch sử
export const getLichSu = async () => {
  const response = await AxiosInstance().get('/lichsu');
  console.log(response);
  return response.data;
};

// lấy lịch thi
export const getLichThi = async () => {
  const response = await AxiosInstance().get('/testschedule');
  console.log(response);
  return response.data;
};

// lấy học phí
export const getHocPhi = async () => {
  const response = await AxiosInstance().get('/hocphi');
  console.log(response);
  return response.data;
};

// lấy danh sách khen thưởng
export const getKhenThuong = async () => {
  const response = await AxiosInstance().get('/khenthuong');
  console.log(response);
  return response.data;
};

// lấy danh sách diễn đàn
export const getDienDan = async () => {
  const response = await AxiosInstance().get('/diendan');
  console.log(response.data);
  return response.data;
};
