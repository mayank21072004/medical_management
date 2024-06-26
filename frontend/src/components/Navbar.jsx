/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "../main";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburger } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = React.useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const Navigateto = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoLogin = () => {
    Navigateto("/login");
  };

  return (
    <nav className="container">
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
        {/* zee care */}
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appointment</Link>
          <Link to={"/about"}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={gotoLogin}>
            LOGIN
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburger />
      </div>
    </nav>
  );
};

export default Navbar;
