import axios from "axios";

const API_URL = "/api/profile/";

const createprofile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, profileData, config);

  return response.data;
};

const getprofile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const updateprofile = async (id, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, updatedData, config);
  return response.data;
};

const profileService = {
  createprofile,
  getprofile,
  updateprofile,
};

export default profileService;