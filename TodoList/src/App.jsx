import React, { useEffect, useState } from 'react';
import TodoForm from '../public/components/TodoForm';
import TodoList from '../public/components/TodoList';

const API = "https://crudcrud.com/api/539e997452414975bbd3c2e6a767de82/todos";

function App() {
  const [todos, setTodos] = useState([]);


  // Fetch tasks
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Add task
  const addTodo = async (task) => {
    const newTask = { task, completed: false };
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    const data = await res.json();
    setTodos(prev => [...prev, data]);
  };

  // Delete task
  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTodos(prev => prev.filter(todo => todo._id !== id));
  };

  // Update task
  // ✅ Clean version (no unnecessary local edit state)
const updateTodo = async (id, completed, task) => {
  try {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, completed }),
    });

    setTodos(prev =>
      prev.map(todo =>
        todo._id === id ? { ...todo, task } : todo
      )
    );
  } catch (error) {
    console.error("Update failed:", error);
  }
};


 /* // Edit task

  const handleSave = async (id, completed) => {
  try {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: editedText, completed }),
    });

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, task: editedText } : todo
      )
    );

    setEditingId(null);
    setEditedText('');
  } catch (error) {
    console.error("Update failed:", error);
  }
}; */


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 
    to-emerald-400">
        <div className="bg-white shadow-lg rounded-3xl p-18">
          <h1 className="text-center font-bold text-3xl mb-6">ToDo App</h1>
          <TodoForm 
          onAdd={addTodo}
          className="mt-4"
           />
          <TodoList todos={todos} onDelete={deleteTodo} onToggle={updateTodo} onEdit={updateTodo}/>
         </div>
    </div>


  );
}

export default App;
