import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import Login from "./Login";
import "./app.css";
export default function App() {
  return (
    <Router>
      <Route path="/home" component={HomeScreen} exact></Route>
      <Route path="/" component={Login} exact></Route>
    </Router>
  );
}
