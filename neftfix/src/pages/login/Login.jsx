import React, { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const [test, setTest] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form action="">
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="loginbutton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more.</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
