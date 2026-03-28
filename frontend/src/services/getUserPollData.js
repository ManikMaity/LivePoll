import axiosInstance from "../helper/axiosInstance";

async function getUserPollData() {
  const responses = await axiosInstance.get("/poll/created");
  return responses.data.data;
}

export default getUserPollData;
