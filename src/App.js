import React from "react";
import './App.css';
import Directory from "./components/directory"

function App() {
  const doStuff = () => console.log("yay im doing stuff!")
  return (
    <Directory prop1={doStuff} prop2="world" />
  );
}

export default App;
