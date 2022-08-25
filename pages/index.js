import { useState } from "react";
import { getTodos } from "../services/httpService";
import { Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { deleteTodo } from "../services/httpService";
import TodoLists from "../components/TodoLists";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ todos }) {
  const [todolist, setTodolist] = useState(todos);
  const [newTodo, setNewTodo] = useState("");

  const handleDelete = (id) => {
    const clone = [...todolist];
    setTodolist(clone.filter((item) => item.id !== id));
    setTimeout(() => {
      try {
        deleteTodo(id);
        toast.success("Reminder Deleted");
      } catch (ex) {
        setTodolist(clone);
        console.log("error", ex);
        toast.error("An Unexpected Error occured.");
      }
    }, 1000);
  };

  const handleAdd = () => {
    if (newTodo) {
      setTodolist([{ title: newTodo, id: 999, completed: false }, ...todolist]);
      setNewTodo("");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <Input
            value={newTodo}
            onChange={({ target }) => setNewTodo(target.value)}
            placeholder="Create a new Todo"
            style={{ margin: "1rem 0" }}
          />
          <button
            type="button"
            onClick={handleAdd}
            style={{ height: "100%" }}
            className="btn btn-sm btn-primary btn-outlined mx-5"
          >
            Add
          </button>
        </div>
        <TodoLists todos={todolist} onDelete={handleDelete} />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const todos = await getTodos();
  return {
    props: {
      todos,
    },
  };
};
