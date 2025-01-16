import axiosInstance from '../../axiosConfig.ts';

const API_URL = import.meta.env.VITE_API_URL;

const savePreferences = async (preferences: { preferred_sources: string[]; preferred_categories: string[]; preferred_authors: string[] }) => {
  const response = await axiosInstance.post(`${API_URL}/preferences`, preferences);
  return response.data;
};

const fetchPreferences = async () => {
  const response = await axiosInstance.get(`${API_URL}/preferences`);
  return response.data;
};

export default { savePreferences, fetchPreferences };