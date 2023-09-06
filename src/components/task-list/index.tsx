import { useState } from 'react';
import { FiTrash } from 'react-icons/fi'
import { BsPencil } from 'react-icons/bs'
import {AiOutlineCheck} from 'react-icons/ai'
import {AiOutlinePlusCircle} from 'react-icons/ai'

import 'bootstrap/dist/css/bootstrap.min.css';
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

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] += ' (completed)';
    setTasks(newTasks);
  };

  return (
    <div className='tasklist-div'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input-group"
          placeholder="Add a task"
        />
        <button type="submit" className="btn btn-primary"><AiOutlinePlusCircle /></button>
      </form>
      <button onClick={clearTasks} className="btn btn-danger">Clear</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => completeTask(index)} className='btn btn-success'><AiOutlineCheck /></button>{' '}
            <button onClick={() => handleEdit(index)} className='btn btn-primary'><BsPencil /></button>{' '}
            <button onClick={() => handleDelete(index)} className='btn btn-danger'><FiTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
