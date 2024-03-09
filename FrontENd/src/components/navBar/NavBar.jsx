import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("token") || null;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="mt-5 bg-gray-200 rounded-t-xl">
      <Container>
        <Navbar.Brand>
          <NavLink
            to="/"
            className="font-serif text-2xl font-extrabold text-blue-800 underline"
          >
            TODO APP
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="items-center me-auto">
            {!token && (
              <>
                <NavLink
                  to="/login"
                  className="p-2 mx-3 font-bold text-black hover:bg-white rounded-xl"
                >
                  Login
                </NavLink>
              </>
            )}
            <NavLink
              to="/register"
              className="p-2 font-bold text-black bg-white rounded-xl hover:scale-110 "
            >
              Add User
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            {token && (
              <button
                onClick={() => logout()}
                className="p-2 text-xl font-bold text-white bg-red-500 hover:bg-red-800 rounded-xl hover:scale-110"
              >
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
