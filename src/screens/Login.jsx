import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/Login.scss";
import {api_url} from '../utils/constants'
import LoadingSpinner from "../components/LoadingSpinner";
import SubmitButton from "../components/SubmitButton";
import InputGroup from "../components/InputGroup";

const Login = ({handleLogin, history, fetchChemicals}) => {


    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(api_url + "/login", {
            method: "POST",
            headers: {
              "Content-type": "Application/json"
            },
            body: JSON.stringify(loginData)
          })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                console.log(data)
               if(data.token){
                   localStorage.setItem("user_info", JSON.stringify({
                       first_name: data.first_name,
                       token: data.token,
                       id: data._id
                   }))
                  handleLogin()
                  fetchChemicals(data.token)
                  history.push("/dashboard")
                   setLoginData({
                       email: "",
                       password: ""
                   })
               }else{
                   alert(data)
            }
         })
            .catch(err => {
                setIsLoading(false);
                console.log(err)
            })

    }

    




    const handleChange = (e) => {
       
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

const {email, password} = loginData;

  return (
    <div className="login-container container">
      <Form onSubmit={handleSubmit} className="max-w-sm mx-auto shadow-lg p-10 rounded-lg shadow-primary">
          <h2 className={`text-xl`}>Login</h2>
          <br />
          <InputGroup>
              <label>Email address</label>
              <input onChange={handleChange} name='email' value={email} type="email" placeholder="Enter email" />
          </InputGroup>
          <InputGroup>
              <label>Password</label>
              <input onChange={handleChange}  name='password' value={password} type="password" placeholder="Password" />
          </InputGroup>
        <SubmitButton text={'Login'} isLoading={isLoading} />
      </Form>
    </div>
  );
};

export default Login;
