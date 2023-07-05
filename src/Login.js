import React from "react";
import Nav from "./Nav";
import "./css/Login.css";
import SignupScreen from "./SignupScreen";

function Login({ login = false }) {
  return (
    <div className="loginScreen">
      <Nav login={!login} />
      <div className="gradient" />
      
        {login ? (
          <SignupScreen />
        ) : (
          <div className="loginScreen_container">
          <div className="loginScreen_body">
            <h1>Unlimited movies, TV shows, and more</h1>
            <p>Watch anywhere. Cancel anytime.</p>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen_input">
              <form action="">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                />
                <a href="/login">
                  <button className="loginScreen_btn">Get Started {">"}</button>
                </a>
              </form>
            </div>
          </div>
          </div>
        )}
      
    </div>
  );
}

export default Login;
