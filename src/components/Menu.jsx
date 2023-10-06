import React, { useContext, useEffect, useState } from "react";
import { BiMenu, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { TodoContext } from "../context/Context";

function Menu() {
  const [data, setData] = useState([]);
  const {todoId, setTodoId} = useContext(TodoContext)
  function HandleData() {
    axios.get("http://127.0.0.1:8000/todos/").then((response) => {
      setData(response.data);
    });
  }
  useEffect(() => {
    HandleData();
  }, []);

  function deleteTodo(id) {
    axios
      .delete(`http://127.0.0.1:8000/todos/${id}`)
      .then((response) => {
        setData(data.filter((todo) => todo.id !== id));
        console.log("Todo was Deleted !");
      })
      .catch((error) => console.log(error));
  }
  return (
      <div className="flex min-h-screen max-h-full w-[21rem] flex-col bg-slate-600 text-white">
        <div className="flex border bg-gray-300 text-black py-2 mx-4 my-2 rounded-lg shadow-lg">
          <span className="flex items-center px-3">
            <BiMenu className="w-6 h-6 " />
          </span>
          <h1 className="flex">Todos Menu</h1>
        </div>
        <div className="h-full mx-4 rounded-lg mt-5">
          <ul className="">
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex bg-gray-500 my-5 mx-1 px-8 py-2.5 justify-between rounded-md hover:shadow-xl cursor-pointer"
                >
                  <h1
                    className="font-semibold text-xl"
                    onClick={() => {
                      setTodoId(item.id)
                    }}
                  >
                    {item.title}
                  </h1>
                  <button className="flex justify-between items-center">
                    <MdDelete
                      className="w-6 h-6 hover:text-red-600"
                      onClick={() => {
                        deleteTodo(item.id);
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
  );
}

export default Menu;
