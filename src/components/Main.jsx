import React, { useState } from "react";
import Menu from "./Menu";
import EditTodo from "./EditTodo";
import AddTodo from "./AddTodo";
import { TodoContext } from "../context/Context";

function MainPage() {
  const [todoId, setTodoId] = useState()

  return (
    <TodoContext.Provider value={{todoId , setTodoId}}>
      <div className="flex">
        <Menu />
        <div className="flex flex-col w-full">
          <AddTodo />
          <hr />
          <EditTodo />
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default MainPage;
