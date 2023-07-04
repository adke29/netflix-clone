import React, { useEffect, useState } from "react";
import "./css/Nav.css";
import logo from "./logo.svg";





function Nav() {
  const [show,handleShow] = useState(false);
  const transitionNavBar = ()=>{
    if(window.scrollY>100){
      handleShow(true);
    }else{
      handleShow(false);
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll",transitionNavBar);
    return()=>{window.removeEventListener("scroll",transitionNavBar)};
  },[])




  return (
    <div className={`nav ${show ? "nav_black":""}`}>
      <div className="nav_contents">
        <img src={logo} alt="logo" className="nav_logo" />
        <img
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.jpg"
          alt="avatar"
          className="nav_avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
