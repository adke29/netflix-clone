import React, { useEffect } from "react";

import "./css/App.css";
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login"
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice"

function App() {
  var user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,userAuth=>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }));
      }else{
        dispatch(logout)
      }
    });
    return unsubscribe;
  },[])

  return (
    <div className="app">
      <Router>
        {user ? (
          <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/hello">
            <h1>Hello World</h1>
          </Route>
        </Switch>
        ):(
          <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/login">
            <Login login={true}/>
          </Route>
        </Switch>
        )}
        
      </Router>
    </div>
  );
}

export default App;
