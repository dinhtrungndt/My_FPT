import AxiosInstance from '../helper/Axiosinstance';

export const login = async (email, password) => {
  try {
    const body = {
      email,
      password,
    };
    const res = await AxiosInstance().post('/login', body);
    console.log('login response', res);
    return res;
  } catch (error) {
    console.log('login error', error);
    return error;
  }
};

// Update thông tin cá nhân
export const editUser = async (id, data) => {
  const response = await AxiosInstance().put(`/login/update-login/${id}`, data);
  console.log('response:', response);
  return response.data;
};

// export const editUser = async data => {
//   try {
//     const res = await AxiosInstance().post('/users/update-profile', data);
//     console.log('editUser response', res);
//     return res;
//   } catch (error) {
//     console.log('editUser error', error);
//     return error;
//   }
// };
