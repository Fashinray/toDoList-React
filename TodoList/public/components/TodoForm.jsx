import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter a task..."
        className="flex-grow px-3 py-2 border rounded-l-lg
           focus:outline-none focus:ring-2  mb-6"
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg
           hover:bg-blue-600">Add</button>
    </form>
  );
};

export default TodoForm;