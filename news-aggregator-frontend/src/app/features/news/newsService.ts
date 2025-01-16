import axiosInstance from '../../axiosConfig.ts';

const API_URL = import.meta.env.VITE_API_URL;

const fetchNews = async (page: number, author?: string, category?: string, source?: string, date?: string, query?: string) => {
  const response = await axiosInstance.get(`${API_URL}/news?page=${page}&author=${author}&category=${category}&source=${source}&date=${date}&query=${query}`);
  return response.data;
};

export default { fetchNews };