import { useState } from "react";
import { getTodos } from "../services/httpService";
import { Input, Button, Select, Pagination } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { deleteTodo } from "../services/httpService";
import TodoLists from "../components/TodoLists";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import paginate from "../services/paginate";
const { Option } = Select;

export default function Home({ todos }) {
  // State
  const [todoList, setTodoList] = useState(todos);
  const [newTodo, setNewTodo] = useState("");
  const [sortPath, setSortPath] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  // Event Handler
  const handleDelete = (id) => {
    const clone = [...todoList];
    deleteTodo(id, clone, setTodoList);
  };

  const handleAdd = () => {
    if (newTodo) {
      setTodoList([{ title: newTodo, id: 999, completed: false }, ...todoList]);
      setNewTodo("");
      toast.success("Reminder Added");
    }
  };

  const handleSort = (value) => {
    setPageNumber(1);
    setSortPath(value);
  };

  const handlePageSize = (value) => {
    if (value === "All") {
      setPageNumber(1);
      setPageSize(todoList.length);
    } else {
      setPageNumber(1);
      setPageSize(value);
    }
  };

  // Sorting

  const sorted = sortPath
    ? _.orderBy(todoList, "completed", sortPath)
    : todoList;

  // Paginate
  const paginated = paginate(sorted, pageNumber, pageSize);

  // Rendering
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <Input
            value={newTodo}
            onChange={({ target }) => setNewTodo(target.value)}
            placeholder="Create a new Todo"
            style={{ margin: "1rem 0", width: "40%" }}
          />
          <Button
            type="primary"
            onClick={handleAdd}
            style={{ height: "100%", marginRight: "1rem" }}
          >
            Add
          </Button>
          <Select
            placeholder="Filter By"
            onChange={handleSort}
            style={{ width: 150 }}
          >
            <Option value={null}>Default</Option>
            <Option value="desc">Completed</Option>
            <Option value="asc">Not Completed</Option>
          </Select>
          <Select
            placeholder="Item Per Page"
            onChange={handlePageSize}
            style={{ width: 150 }}
          >
            <Option value={8}>8</Option>
            <Option value={12}>12</Option>
            <Option value={16}>16</Option>
            <Option value="All">All</Option>
          </Select>
        </div>
        <TodoLists todos={paginated} onDelete={handleDelete} />
        <div className="d-flex justify-content-center align-items-center">
          <Pagination
            pageSize={pageSize}
            onChange={(page) => setPageNumber(page)}
            total={50}
            style={{ marginTop: "2rem" }}
          />
        </div>
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
