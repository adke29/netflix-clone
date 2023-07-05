import React from "react";
import "./css/ProfileScreen.css";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div className="profileScreen">
      <Nav user={true} />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.jpg"
            alt="profile-picture"
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <button
                className="profileScreen_signOut"
                onClick={() => {
                  signOut(auth);
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
