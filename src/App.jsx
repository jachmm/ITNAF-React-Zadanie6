import { useState } from 'react';
import './app.css'; 

function App() {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(false);
  const [nextId, setNextId] = useState(0);

  const handleCreateTask = () => {
    if (taskName.length === 0) {
      window.alert("Podaj treść");
    } else {
      const newTask = {
        id: nextId,
        name: taskName,
        priority: priority,
      };
      setNextId(nextId + 1);
      setTodoList([...todoList, newTask]);
      setTaskName('');
      setPriority(false);
    }
  };
  
  const deleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task) => task.id !== taskId);
    setTodoList(updatedTodoList);
  };

  const markAsDone = (taskId) => {
    const taskToMove = todoList.find((task) => task.id === taskId);
    setDoneList([...doneList, taskToMove]);
    deleteTask(taskId);
  };

  return (
    <>
      <h1>Utwórz nowe zadanie:</h1>
      <div>
        <label>
          Treść zadania:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Priorytet:
          <input
            type="checkbox"
            checked={priority}
            onChange={() => setPriority(!priority)}
          />
        </label>
      </div>

      <button onClick={handleCreateTask}>Create</button>

      <hr />

      <h1>TODO List:</h1>
      <table>
        <tbody>
          {todoList.map((task) => (
            <tr key={task.id}>
              <td>{task.priority ? <span style={{ color: 'red' }}>{task.name}</span> : <span>{task.name}</span>}</td>
              <td>
                <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="done" onClick={() => markAsDone(task.id)}>Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h1>Done List:</h1>
      <table>
        <tbody>
          {doneList.map((task) => (
            <tr key={task.id}>
              <td>{task.priority ? <span style={{ color: 'red' }}>{task.name}</span> : <span>{task.name}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
