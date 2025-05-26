import React, { useState } from 'react';

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditedText(todo.task);
  };

  const handleSave = (id, completed) => {
    if (!editedText.trim()) return;
    onEdit(id, completed, editedText); // ✅ Send edited text
    setEditingId(null); // ✅ Reset local state
    setEditedText('');
  };

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li
          key={todo._id}
          className={`flex justify-between items-center p-2 border rounded ${
            todo.completed ? 'bg-green-100' : ''
          }`}
        >
          {editingId === todo._id ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(todo._id, todo.completed);
              }}
              className="flex-1 mr-2 p-1 border rounded"
            />
          ) : (
            <span
              onClick={() => onToggle(todo._id, todo.completed, todo.task)}
              className={`flex-1 cursor-pointer ${
                todo.completed ? 'line-through' : ''
              }`}
            >
              {todo.task}
            </span>
          )}

          <div className="flex gap-2">
            {editingId === todo._id ? (
              <button
                onClick={() => handleSave(todo._id, todo.completed)}
                className="text-green-500 hover:underline"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)}
                className="text-yellow-500 hover:underline"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(todo._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
