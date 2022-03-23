import axios from "axios";

// const url = "";
const url = "http://localhost:5000/api";

export const getVoters = (query) => {
  return axios.get(`${url}/voters?query=${query}`);
};

export const createVoting = (votingInfo) => {
  return axios.post(`${url}/voting`, votingInfo);
};

export const getSchools = () => {
  return axios.get(`${url}/schools`);
};

export const getVotersBySchool = (school) => {
  console.log("getVotersBySchool", school);
  return axios.get(`${url}/schools/${school}`);
};

export const getCount = (query) => {
  return axios.get(`${url}/count?query=${query}`);
};
