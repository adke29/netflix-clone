import React, { useRef } from "react";
import "./css/SignupScreen.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
    
  };

  return (
    <div className="signupScreen">
      <div className="signupScreen_body">
        <form action="">
          <h1>Sign In</h1>
          <input
            ref={emailRef}
            type="email"
            placeholder="Email or phone number"
            className="text"
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="text"
          />
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <div className="form_footer">
            <div className="remember-me">
              <input type="checkbox" id="remember-me"></input>
              <label>Remember Me</label>
            </div>
            <div className="needHelp">
              <a href="#">Need help?</a>
            </div>
          </div>
        </form>
        <div className="signupScreen_footer">
          <h2>
            New to Netflix? <span onClick={register}>Sign up now</span>
          </h2>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <a href="">Learn more.</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
