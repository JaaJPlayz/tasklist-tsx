import { useState } from 'react';
import {FiTrash} from 'react-icons/fi'
import {BsFillPencilFill, BsPencil} from 'react-icons/bs'
import './style.css'

const TaskList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask('');
  };

  const handleEdit = (index: number) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return prompt('Edit task', task) || '';
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  };

  const handleDelete = (index: number) => {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className='tasklist-div'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <button onClick={clearTasks}>Clear</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => handleEdit(index)}><BsPencil /></button>{' '}
            <button onClick={() => handleDelete(index)}><FiTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
