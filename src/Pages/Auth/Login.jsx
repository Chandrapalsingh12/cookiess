import "./auth.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      <h1>Loading........</h1>
      return;
    }
    if (user) navigate("/"); 
  }, [user, loading]);
 

  return (
    <div className="login-main">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/join" style={{ color: "blue" }}>
              Sign up
            </Link>{" "}
          </p>
          <p style={{ textAlign: "center" }}>
            Return To Home
            <Link to="/" style={{ color: "blue" }}>
              Home Page
            </Link>{" "}
          </p>
        </form>

        <div className="google-login">
          <button className="google-login-button" onClick={signInWithGoogle}>
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google Logo"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
