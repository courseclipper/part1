import React, { Fragment, useState } from "react";
import { Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar/Navbar";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (
      username === "course-clipper-admin" &&
      password === "Password123"
    ) {
      localStorage.setItem("AdminCondition", "true");
      navigate("/admin");
    } else {
      alert('Incorrect username or password!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <Form layout="vertical" className="register-form">
          <h3 className="text-center">Login</h3>
          <FormItem label="Username" name="Username">
            <Input required value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormItem>
          <FormItem label="Password" name="Password">
            <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormItem>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </Form>
      </div>
    </>
  );
}

export default AdminLogin;
