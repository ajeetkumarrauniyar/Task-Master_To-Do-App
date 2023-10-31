import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function AddTask() {
  // Initialize state to store user input and task list
  const [taskInput, setTaskInput] = useState({ id: " ", task: " " }); // State for input data
  const [taskItemList, setTaskItemList] = useState([]); // State for the list of tasks
  
  // Handling the form submission when the "Add Task" button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
       // Sending the input data to the backend via a POST request
      const res = await fetch("https://task-master-gvk8.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskInput),
      });

      if (res.status === 201) {
        // alert("Task Added !");
        toast.success("Task Added !"); // Display a success toast message
        setTaskInput({ id: " ", task: " " }); // Clear the input field after the task is added
        setTaskItemList([...taskItemList, taskInput]); // After adding the task, update the task list
      }
    } catch (error) {
      console.error("Error in adding task", error);
    }
  };

  // Fetching the Task List from the storage,  Default GET Method
  const getData = async () => {
    try {
      const result = await fetch("https://task-master-gvk8.onrender.com");
      const data = await result.json(); // Converting the data into JSON
      setTaskItemList(data); // Update the task list with the retrieved data
    } catch (error) {
      console.log("Error in getting Tasks", error);
    }
  };

  // Using the `useEffect` to call `getData` when the component/app starts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures `getData` runs only once on starting

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Toaster position="top-right"/>

      {/* Background Effect */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Title */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get Things Done Today!
        </h2>
      </div>

      <form
        action="#"
        method="POST"
        className="mx-auto max-w-xl grid grid-cols-1 sm:grid-cols-3 sm:mt-8"
        onSubmit={handleSubmit}
      >
        {/* Enter task  */}
        <div className="my-2 block sm:w-36 mt-3 sm:ms-auto sm:my-auto rounded-md bg-pink-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm">
          <h5>Enter Task</h5>
        </div>

        {/* Task Input */}
        <div className="block sm:col-span-2 w-auto items-center justify-center sm:flex">
          {/* Task Input Field */}
          <input
            type="text"
            name="task-input"
            id="task-input"
            placeholder="Go to market"
            className="block w-full sm:w-auto sm:mx-3 rounded-md border-0 px-3.5 py-2.5 sm:py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={taskInput.task}
            onChange={(e) =>
              setTaskInput({ ...taskInput, task: e.target.value })
            }
          />

          {/* Add task button */}
          <button
            type="submit"
            className="block w-full mt-2 sm:mt-0 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="mx-auto mt-11 max-w-xl">
        <div className="mt-10 sm:mt-1">
          <ul className="divide-y divide-gray-100 items-center sm:ms-12">
            {/* Tasks */}
            {taskItemList.map((item, index) => {
              return (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg font-semibold leading-6 text-gray-900">
                        {item.task}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                    {/* Task Edit Button */}
                    {/* Task Delete Button */}
                    {/* <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button> */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

 // Exporting the component
export default AddTask;
