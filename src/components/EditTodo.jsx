import { BiGridHorizontal, BiPencil, BiSolidSave } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { TodoContext } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function EditTodo() {
  const { todoId, setTodoId } = useContext(TodoContext);
  const [Title, setTitle] = useState("");
  const [Done, setDone] = useState(false);
  const [Priority, setPriority] = useState(1);
  const [Content, setContent] = useState("");

  function fetchData() {
    axios
      .get(`http://127.0.0.1:8000/todos/${todoId}`)
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setDone(data.is_done);
        setPriority(data.priority);
        setContent(data.content);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchData();
  }, [todoId]);

  function SaveTodo(event) {
    const todoNewData = {
      "title": Title,
      "content": Content,
      "priority": Priority,
      "is_done": Done,
      "user":1
    };
    console.log(todoId , todoNewData)
    axios
      .put(`http://127.0.0.1:8000/todos/${todoId}`, todoNewData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
  return (
    <div className="w-full mt-5 flex-auto">
      <h1 className="flex justify-center text-lg font-semibold py-2 border border-gray-600">
        Edit Todo
      </h1>
      <h1 className="flex text-lg font-semibold py-3 px-5">
        <span className="flex items-center px-2">
          <BiPencil className="w-6 h-6" />
        </span>
        Name : {Title}
      </h1>
      <form className="flex ">
        <div className="flex flex-col mt-2">
          <label className="flex px-2 py-2 mx-2">
            <h1 className="flex items-center font-semibold">Title :</h1>
            <input
              type="text"
              value={Title}
              className="border focus:border-2 focus:border-black focus:outline-none border-gray-500 rounded-lg px-4 w-72  py-2 mx-1"
              placeholder="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="flex px-2 py-2 mx-5 ">
            <input
              type="checkbox"
              className="flex items-start border focus:border-2 focus:border-black focus:outline-none border-gray-500 rounded-lg mx-1"
              checked={Done}
              onChange={() => {
                setDone(!Done);
              }}
            />
            <h1 className="flex items-center font-semibold">Done</h1>
          </label>
          <label className="flex px-2 py-2 mx-2">
            <h1 className="flex items-center font-semibold">Label :</h1>
            <input
              type="number"
              min={0}
              max={10}
              value={Priority}
              onChange={(event) => setPriority(event.target.value)}
              className="border focus:border-2 focus:border-black focus:outline-none border-gray-500 rounded-lg px-4 w-72  py-2 mx-1"
              placeholder="Priority"
            />
          </label>
        </div>
        <div className="">
          <label className="">
            <h1 className="flex items-center font-semibold pb-1">Content :</h1>
            <textarea
              className="border focus:border-2 focus:border-black border-gray-600 focus:outline-none rounded-lg px-4 py-3"
              rows="5"
              cols="30"
              value={Content}
              placeholder="Content"
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex justify-center items-center mx-8">
          <button
            className="flex border border-gray-800 justify-between rounded-lg px-4 py-3"
            type="submit"
            onClick={(event)=> SaveTodo(event)}
          >
            <span className="flex items-center px-1">
              <BiSolidSave className="w-6 h-6 mr-1" />
            </span>
            <h1 className="flex">Save todo</h1>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
