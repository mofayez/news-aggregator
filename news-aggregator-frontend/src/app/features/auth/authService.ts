import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
  email: string;
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
  return response.data;
};

const register = async (name: string, email: string, password: string, password_confirmation: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/register`, { name, email, password, password_confirmation });
  return response.data;
};

export default { login, register };
