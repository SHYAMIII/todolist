'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-8 space-y-4">
      {/* Input and Add Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 p-3 text-sm sm:text-base rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={addTodo}
          className="w-full sm:w-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-200"
          >
            {/* Checkbox + Text */}
            <div className="flex items-center flex-1 min-w-[200px] mb-2 sm:mb-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 mr-3 accent-purple-500 flex-shrink-0"
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-transparent text-white mr-2 focus:outline-none text-sm sm:text-base"
                />
              ) : (
                <span
                  className={`flex-1 text-white text-sm sm:text-base break-words ${
                    todo.completed ? 'line-through opacity-70' : ''
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto sm:ml-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="px-3 py-2 text-green-400 hover:bg-white/10 rounded-lg text-sm sm:text-base"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo.id, todo.text)}
                  className="px-3 py-2 text-blue-400 hover:bg-white/10 rounded-lg text-sm sm:text-base"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-2 text-red-400 hover:bg-white/10 rounded-lg text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
