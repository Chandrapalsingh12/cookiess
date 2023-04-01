import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

function Joinus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history("/");
  }, [user, loading]);

  return (
    <div className="login-main">
      <div className="login">
        <h2>Join Us</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type="submit" onClick={register}>Join</button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Log in{" "}
            </Link>
          </p>
          <span className="text-center">Or</span>
          <p className="text-center">
            Return To{" "}
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

export default Joinus;
