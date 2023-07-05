import React, { useRef } from "react";
import "./css/SignupScreen.css";

function SignupScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e)=>{
    e.preventDefault();
  }

  const signIn = (e)=>{
    e.preventDefault();

  }

  return (
    <div className="signupScreen">
      <div className="signupScreen_body">
        <form action="">
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            className="text"
          />
          <input type="password" placeholder="Password" className="text" />
          <button type="submit" onClick={signIn}>Sign In</button>
          <div className="form_footer">
            <div className="remember-me">
              <input type="checkbox" id="remember-me"></input>
              <label for="remember-me">Remember Me</label>
            </div>
            <div className="needHelp">
                <a href="#">Need help?</a>
            </div>
          </div>
        </form>
        <div className="signupScreen_footer">
        <h2>New to Netflix? <span onClick={register}>Sign up now</span></h2>
        <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="">Learn more.</a></p>
      </div>
      </div>
      
    </div>
  );
}

export default SignupScreen;
