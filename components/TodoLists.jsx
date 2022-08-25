import React from "react";
import Link from "next/link";

const TodoLists = ({ todos, onDelete }) => {
  return (
    <ul className="list-group mb-5">
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <li className="list-group-item">
            <div className="row">
              <div className="col">
                <Link href={`/${todo.id}`} bye="hi">
                  <span>{todo.title}</span>
                </Link>
              </div>
              <div className="col">
                <div className="d-flex justify-content-center align-items-center">
                  <label className="form-check-label mx-2">Finished:</label>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    defaultChecked={todo.completed}
                  />
                </div>
              </div>
              <div className="col">
                <button
                  onClick={() => onDelete(todo.id)}
                  className="btn btn-danger rounded-pill btn-sm mx-5"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default TodoLists;
