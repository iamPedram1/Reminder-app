import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
const api = config.apiEndPoint;

export const getTodos = async () => {
  const { data } = await axios.get(api);
  return data;
};

export const getInvidoualTodo = async (id) => {
  const { data } = await axios.get(`${api}/${id}`);
  return data;
};

export const deleteTodo = async (id, clone, setTodoList) => {
  setTodoList(clone.filter((item) => item.id !== id));
  try {
    await axios.delete(`${api}/${id}`);
    toast.success("Reminder Deleted");
  } catch (ex) {
    setTodoList(clone);
    toast.error("An Unexpected Error occured.");
  }
};
