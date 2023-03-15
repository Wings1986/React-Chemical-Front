import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
import "../styles/Register.scss";
import {api_url} from '../utils/constants';
import LoadingSpinner from "../components/LoadingSpinner";
import SubmitButton from "../components/SubmitButton";

const Register = ({handleLogin, history, fetchChemicals}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [registerData, setRegisterData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const [formError, setFormError] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(api_url + "/register", {
            method: "POST",
            headers: {
              "Content-type": "Application/json"
            },
            body: JSON.stringify(registerData)
          })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
               if(data.token){
                   localStorage.setItem("user_info", JSON.stringify({
                       first_name: data.first_name,
                       token: data.token,
                       id: data._id
                   }))
                   setRegisterData({
                       first_name: "",
                       last_name: "",
                       email: "",
                       password: ""
                   })
                   handleLogin();
                   fetchChemicals(data.token)
                  history.push("/dashboard")
               }else{
                  data.errors.map(error => {
                      alert(error.msg)
                  }) 
               }
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err)
            })


    }

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }


    const {first_name, last_name, email, password} = registerData

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="mx-auto max-w-sm p-10 shadow-lg shadow-primary">

          <h2 className={`text-xl font-bold mb-10`}>Register</h2>
          <div className="flex flex-col gap-1 my-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={first_name} onChange={handleChange} name="first_name" type="text" placeholder="First Name" />
          </div>

          <div className="flex flex-col gap-1 my-2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={last_name} onChange={handleChange} name="last_name" type="text" placeholder="Last Name" />
          </div>


          <div className="flex flex-col gap-1 my-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} onChange={handleChange} name="email" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </div>

            <div className="flex flex-col gap-1 my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Password" />
            </div>
          <SubmitButton text={'Register'} isLoading={isLoading} />
      </Form>
    </div>
  );
};

export default Register;
