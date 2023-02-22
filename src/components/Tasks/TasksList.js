import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, toggleTask, removeTask } from './taskSlice';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleRemove = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span>{task.title}</span>
              <button onClick={() => handleRemove(task.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Task</p>
      )}
    </div>
  );
}

export default TaskList;