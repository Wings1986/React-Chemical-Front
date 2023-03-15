import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = ({ handleLogout, isLoggedIn }) => {
  const { token, first_name } = JSON.parse(localStorage.getItem("user_info")) || "";

  return (
    <nav className={`shadow-md bg-primary text-white`}>
      <div className={`container`}>
        <h4 className={`m-0 text-lg`}>
          <Link className="e" to="/">
            Chemical App
          </Link>
        </h4>
        <ul className={`flex gap-8 items-center`}>
          {isLoggedIn === "true" || token ? (
              <>
                <li>
                  <Link to="/dashboard">
                    Welcome <span className={`text-lime-400`}>{first_name.toUpperCase()}!</span>
                  </Link>
                </li>
                <li>
                  <Link className="" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li onClick={() => handleLogout()}>
                  <Link className="" to="/dashboard">
                    Logout
                  </Link>
                </li>
              </>
          ) : (
              <div className={`flex gap-8 text-sm`}>
                <li>
                  <Link className="" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className=" bg-secondary p-3 text-black rounded-md shadow-lg shadow-secondary" to="/register">
                    Register
                  </Link>
                </li>
              </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
