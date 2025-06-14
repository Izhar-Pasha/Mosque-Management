import "./Navbar.scss";
import logo from "../Assets/Logo.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/categoryContext.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api_calls/authAPI.js";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const { setCategory, setOperation, setQuerykey } = useMyContext();
  const [isDisplay, setIsDisplay] = useState(false);

  const toggle = () => {
    setIsDisplay((prev) => !prev);

    if (!isDisplay) {
      document.body.classList.add("show-aside");
    } else {
      document.body.classList.remove("show-aside");
    }
  };

  const handleNavClick = (category, key) => {
    // console.log("cat:", category, "key:", key);

    setCategory(category);
    setOperation("get");
    setQuerykey(key);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const Logout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Successfully logout");
      queryClient.invalidateQueries({ queryKey: ["Logout"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(
        err.response?.data.message || err.message || "Something went wrong"
      );
    },
  });

  const handleLogout = () => {
    Logout.mutate();
  };

  return (
    <>
      <nav className="navbar">
        <div className="btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="logo">
          <img src={logo} alt="Mosque_Logo.jpg" />
        </div>
        <ul className="nav-links">
          <Link to={"/api/dashboard"} className="navs">
            Dashboard
          </Link>
          <Link
            to={"/api/saathi"}
            onClick={() => handleNavClick("Saathi", "saathiKey")}
            className="navs"
          >
            Saathi
          </Link>
          <Link
            to={"/api/professional"}
            onClick={() => handleNavClick("Professional", "professionalKey")}
            className="navs"
          >
            Professional
          </Link>
          <Link
            to={"/api/student"}
            onClick={() => handleNavClick("Student", "studentKey")}
            className="navs"
          >
            Student
          </Link>
        </ul>

        <div className="hamburger" onClick={toggle}>
          ☰
        </div>
      </nav>
      <aside className={isDisplay ? "show-aside" : "hide-aside"}>
        <div className="hamburger" onClick={toggle}>
          X
        </div>
        <ul>
          <Link to={"/api/dashboard"} className="nav">
            Dashboard
          </Link>
          <Link
            to={"/api/saathi"}
            onClick={() => handleNavClick("Saathi", "saathiKey")}
            className="nav"
          >
            Saathi
          </Link>
          <Link
            to={"/api/professional"}
            onClick={() => handleNavClick("Professional", "professionalKey")}
            className="nav"
          >
            Professional
          </Link>
          <Link
            to={"/api/student"}
            onClick={() => handleNavClick("Student", "studentKey")}
            className="nav"
          >
            Student
          </Link>
        </ul>
      </aside>
      <Outlet />
    </>
  );
};

export default Navbar;
