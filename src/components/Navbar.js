import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Container, Nav, Navbar as BootNavbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config";
import { UserContext } from "../contexts/UserContext";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";

const Navbar = () => {
  const user = useContext(UserContext);

  const { setGlobalError } = useContext(GlobalErrorContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <BootNavbar bg="dark" data-bs-theme="dark">
      <Container>
        <BootNavbar.Brand href="#home">Navbar</BootNavbar.Brand>
        <Nav className="me-auto">
          <NavLink className="NavLink" to="/">
            Home
          </NavLink>
          {user ? (
            <NavLink className="NavLink" to="/profile">
              Moj Profil
            </NavLink>
          ) : null}
          {user ? (
            <NavLink className="NavLink" to="/newbook">
              Nova Lektira
            </NavLink>
          ) : null}
          {!user ? (
            <NavLink className="NavLink" to="/login">
              Login
            </NavLink>
          ) : null}
          {user ? (
            <NavLink className="NavLink" onClick={handleLogOut}>
              Logout
            </NavLink>
          ) : null}
        </Nav>
      </Container>
    </BootNavbar>
  );
};

export default Navbar;
