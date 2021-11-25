import { useState, useEffect, useRef } from "react";
import "./styles/app.css";
import {
  BsList,
  BsListUl,
  BsTrashFill,
  BsFillImageFill,
  BsFillSunFill,
  BsFillPencilFill,
} from "react-icons/bs";

// Function for getting  data stored in local storage
const getTasks = () => {
  if (localStorage.getItem("tasks")) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(getTasks());
  const [edit, setEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState("");
  const [error, setError] = useState(false);
  const taskInput = useRef();

  const addTask = (taskToAdd) => {
    if (edit) {
      console.log("Got here");

      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id
            ? {
                ...task,
                task: taskToAdd,
              }
            : task
        )
      );
      taskInput.current.value = "";
      setEdit(false);
    } else {
      if (!taskToAdd) {
        setError(true);
      } else {
        const id = Math.random() * 15;
        const newTask = { id: id, task: taskToAdd };
        setTasks([...tasks, newTask]);
        taskInput.current.value = "";
        setError(false);
      }
    }
  };

  const editTask = (task) => {
    setTaskToEdit(task);
    taskInput.current.value = task.task;
    setEdit(true);
    console.log(task);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Hook/Process of storing  data to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  console.log(tasks);

  return (
    <div className="app-container">
      <h1>Simple Task App</h1>

      <main className="app-main">
        <section>
          {tasks.map((taskitem) => (
            <div key={taskitem.id} className="task-container">
              <p>{taskitem.task}</p>
              <div>
                <button
                  onClick={() => editTask(taskitem)}
                  style={{ marginRight: "1.5em" }}
                >
                  <BsFillPencilFill />
                </button>
                <button onClick={() => deleteTask(taskitem.id)}>
                  <BsTrashFill />
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="task-input">
          <input
            type="text"
            name="item"
            id="item"
            ref={taskInput}
            placeholder="Add your task here"
          />

          <button
            onClick={() => addTask(taskInput.current.value)}
            className="action-button"
          >
            {edit ? "EDIT" : "ADD"}
          </button>

          {error ? <p className="error-text">Please enter a task.</p> : ""}
        </section>
      </main>
    </div>
  );
}

export default App;
