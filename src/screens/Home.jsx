import React from "react";
import "../styles/Home.scss";
import { Link } from "react-router-dom";
import image from '../assets/images/inventory.png';

const Home = () => {
  return (
    <div className="container min-h-[60vh]">
      <div className="flex gap-10 items-center">
        <div className={`mb-5`}>
          <img src={image} className={`h-28`} alt={``}/>
        </div>
        <div>
          <h1 className={`text-2xl`}>Chemistry App</h1>
          <div className="btns">
            <p>
              {" "}
              Click here to <Link className={`text-blue-400`} to="/register">Register</Link>
            </p>
            <p>
              Already have an account? <Link className={`text-blue-400`} to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
