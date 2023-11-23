import React , {useContext} from 'react'
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';

const ClientId = '458159501348-1cvbb6hb8hte66at0fqv831lascvm4m1.apps.googleusercontent.com';  
function Login() {
     const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
  const onSuccess = (res)=>{
    console.log(res.profileObj);
    const response = axios.post("http://3001/google/signin" , res.profileObj).then((res)=>{
      if(res.data){
        console.log('login_details',res.data);
        // alert("YOUR GMAIL LOGIN PASSWORD IS YOUR EMAIL");
        dispatch({type : 'LOGIN' , payload : res.data});
        localStorage.setItem("User",JSON.stringify(res.data));
        navigate("/review");
      }
    }).catch((err)=>{
      console.log(err);
    });
    }
    const onFailure = (res)=>{
    console.log("LOGIN FAILED",res);
    }
  return (
    <GoogleLogin
    clientId={ClientId}
    buttonText = "Signin with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single-host-origin'}
    isSignedIn = {true}
    />
  )
}

export default Login;