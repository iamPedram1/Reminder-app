import axios from "axios";
import config from "../config.json";

const api = config.apiEndPoint;

export const getTodos = async () => {
  const { data } = await axios.get(api);
  return data;
};

export const getInvidoualTodo = async (id) => {
  const { data } = await axios.get(`${api}/${id}`);
  return data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${api}/${id}`);
};
