import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./homepage";
import codeBlock from "./codeBlock";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/code-block/:id" element={<codeBlock />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
