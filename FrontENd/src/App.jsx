import React from "react";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Todo from "./components/todo";
import NavBar from "./components/navBar/NavBar";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TokenProvider, useToken } from "./components/login/TokenContext";

function App() {
  const { token } = useToken(); // Access the token here

  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* If token exists, go to home page, otherwise go to login */}
          {token ? (
            <Route path="/" element={<Todo />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Wrap the entire application with TokenProvider
function AppWithTokenProvider() {
  return (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}

export default AppWithTokenProvider;
