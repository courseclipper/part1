import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import api from "../../../api";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const onSuccess = (res) => {
    const user = jwtDecode(res.credential)
    localStorage.setItem("User", JSON.stringify({ user: { email: user.email, name: user.name } }));
    window.location.reload();
    // const response = api
    //   .post("/google/signin", res.profileObj)
    //   .then((res) => {
    //     if (res.data) {
    //       console.log("login_details", res.data);
    //       // alert("YOUR GMAIL LOGIN PASSWORD IS YOUR EMAIL");
    //       dispatch({ type: "LOGIN", payload: res.data });
    //       localStorage.setItem("User", JSON.stringify(res.data));
    //       window.location.reload();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED", res);
  };
  return (
    <GoogleLogin
      text="Signin with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

export default Login;
