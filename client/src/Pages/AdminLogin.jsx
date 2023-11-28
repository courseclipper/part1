import React, { Fragment } from 'react'
import { Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';

function AdminLogin() {
  const navigate = useNavigate();
  // const { handleSubmit: handleSubmitAdmin, control: controlAdmin } = useForm();
    const customSubmitFunction = (data) => {
        if (
          data.username === "xtzt092@#14pqnz" &&
          data.password === "478420478457"
        ) {
          localStorage.setItem("AdminCondition", "true");
          navigate("/admin");
        }
      };
     
    return (
        <>
        <Navbar/>
        {/* onSubmit={} */}
        <div className="form-container" >
          <Form layout='vertical'  className='register-form' onFinish={customSubmitFunction}>
            <h3 className='text-center'>Login</h3>
            <FormItem label='email' name='username'>
              <Input type='text' required />
            </FormItem>
            <FormItem label='Password' name='password'>
              <Input type='password' required />
            </FormItem>
            <button className='btn btn-primary' type='submit'>Register</button>
          </Form>
        </div>
      </>  
         
   )
}

export default AdminLogin