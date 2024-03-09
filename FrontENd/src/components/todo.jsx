import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      if (Array.isArray(response.data)) {
        setTodos(response.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (e) {
      console.error("Error fetching todos:", e);
    }
  };

  const addTodo = async () => {
    if (inputName.trim() === "" || inputCategory.trim() === "") return;
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        name: inputName,
        description: inputDescription,
        category: inputCategory,
      });
      setTodos([...todos, response.data]);
      setInputName("");
      setInputDescription("");
      setInputCategory("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${_id}`);
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const toggleComplete = async (_id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === _id);
      updatedTodo.completed = !updatedTodo.completed;
      await axios.put(`http://localhost:3000/todos/${_id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo._id === _id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setEditName(todo.name);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditName("");
    setEditDescription("");
  };

  const updateTodo = async () => {
    try {
      const updatedTodo = { ...editingTodo, name: editName, description: editDescription };
      await axios.put(`http://localhost:3000/todos/${editingTodo._id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo._id === editingTodo._id ? updatedTodo : todo)));
      setEditingTodo(null);
      setEditName("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredTodos = filterCategory
    ? todos.filter((todo) => todo.category.toLowerCase() === filterCategory.toLowerCase())
    : todos;

  return (
    <div className="p-5 bg-gray-200 ">
      <div className="max-w-md p-5 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-800">Todo List</h1>

        {/* Filter by Category Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Filter by Category</h2>
          <input
            className="w-full px-3 py-2 mb-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Enter Category Name"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => setFilterCategory("")}
          >
            Clear Filter
          </button>
        </div>

        {/* Todos Section */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Todos</h2>
          {filteredTodos.map((todo) => (
            <div key={todo._id} className="p-4 mb-4 border border-gray-300 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={
                      todo.completed ? "line-through text-gray-500" : "text-black font-semibold"
                    }
                  >
                    {todo.name}
                  </p>
                  <p className="text-gray-700">{todo.description}</p>
                </div>
                <button
                  className={`px-3 py-1 text-l font-bold mr-2 ${
                    todo.completed
                      ? "bg-gray-300 text-gray-600"
                      : "bg-green-500 text-white hover:scale-110"
                  } rounded-full mb-2`}
                  onClick={() => toggleComplete(todo._id)}
                >
                  {todo.completed ? "In Progress" : "Done"}
                </button>
              </div>
              <div className="flex justify-between">
                {editingTodo === todo ? (
                  <>
                    <button
                      className="px-3 py-1 mb-2 font-bold text-white bg-green-500 rounded-full hover:scale-110"
                      onClick={updateTodo}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 mb-2 font-bold text-white bg-gray-500 rounded-full hover:scale-110"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-3 py-1 mt-4 mb-2 font-bold text-white bg-blue-500 rounded-full text-l hover:scale-110"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 mt-4 mb-2 font-bold text-white bg-red-500 rounded-full text-l hover:scale-110"
                      onClick={() => removeTodo(todo._id)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Add New Todo Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Add New Todo</h2>
          <input
            className="w-full px-3 py-2 mb-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Todo Name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 mb-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Description"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 mb-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
            placeholder="Category"
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
     
      </div>
    </div>
  );
}
