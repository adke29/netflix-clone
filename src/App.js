import React, { useEffect } from "react";

import "./css/App.css";
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";
import ProfileScreen from "./ProfileScreen";


function App() {
  var user = useSelector(selectUser);
  const dispatch = useDispatch(); 
  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {user ? (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route path="/login" element={<Login login={true} />}/>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
