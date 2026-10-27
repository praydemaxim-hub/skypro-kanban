import axios from "axios";

const AUTH_URL = "https://wedev-api.sky.pro/api/user";

export async function loginUser(userData) {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData, {
      headers: {
        "Content-Type": "",
      },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Ошибка авторизации", { cause: error });
  }
}

export async function registerUser(userData) {
  try {
    const response = await axios.post(AUTH_URL, userData, {
      headers: {
        "Content-Type": "",
      },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Ошибка регистрации", { cause: error });
  }
}