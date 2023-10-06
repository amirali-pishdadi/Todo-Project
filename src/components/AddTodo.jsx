import { useState } from "react";
import { BiMenu, BiPlus } from "react-icons/bi";
import axios from "axios";



function AddTodo() {
  const [Title, setTitle] = useState("");
  const [Done, setDone] = useState(false);
  const [Priority, setPriority] = useState(1);
  const [Content, setContent] = useState("");

  function ChangeTitle(event) {
    setTitle(event.target.value);
  }
  function ChangePriority(event) {
    setPriority(event.target.value);
  }
  function ChangeContent(event) {
    setContent(event.target.value);
  }
   function handleSubmit() {
    
    const formData = {
      title: Title,
      content: Content,
      priority: Priority,
      is_done: Done,
      user: 1,
    };
    axios
      .post(
        "http://127.0.0.1:8000/todos/",
        formData
      )
      .then((response) => {
        console.log(response);
        // Do something with the response, such as show a success message
      })
      .catch((error) => {
        console.error(error);
        // Do something with the error, such as show an error message
      });
   }
  return (
    <div className="min-w-full max-w-screen-lg">
      <div className="flex justify-center text-lg font-semibold py-2 mb-5 border border-gray-500">
        Add Todo
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="flex flex-col mt-2">
          <label className="flex flex-1 px-2 py-2 mx-2">
            <h1 className="flex flex-1 items-center font-semibold">Title :</h1>
            <input
              type="text"
              className="border focus:border-2 focus:border-black focus:outline-none border-gray-500 rounded-lg px-4 w-72  py-2 mx-1"
              placeholder="Title"
              value={Title}
              onChange={(event) => {
                ChangeTitle(event);
              }}
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
          <label className="flex flex-1 px-2 py-2 mx-2">
            <h1 className="flex flex-1 items-center font-semibold">
              Priority :
            </h1>
            <input
              type="number"
              min={0}
              max={10}
              className="border focus:border-2 focus:border-black focus:outline-none border-gray-500 rounded-lg px-4 w-72  py-2 mx-1"
              placeholder="Priority"
              value={Priority}
              onChange={(event) => {
                ChangePriority(event);
              }}
            />
          </label>
        </div>
        <div className="">
          <label className="">
            <h1 className="flex flex-1 items-center font-semibold pb-1">
              Content :
            </h1>
            <textarea
              className="flex flex-1 border focus:border-2 focus:border-black border-gray-600 focus:outline-none rounded-lg px-4 py-3"
              rows="5"
              cols="30"
              placeholder="Content"
              value={Content}
              onChange={(event) => {
                ChangeContent(event);
              }}
            ></textarea>
          </label>
        </div>
        <div className="flex justify-center items-center mx-10">
          <button
            className="flex border border-gray-800 justify-between rounded-lg px-4 py-3"
            type="submit"
          >
            <span className="flex flex-1 items-center">
              <BiPlus className="w-6 h-6 mr-1" />
            </span>
            <h1 className="flex">Add todo</h1>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
