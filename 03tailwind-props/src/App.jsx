import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Card from "./components/Card";

function App() {
  
let myObj = {
  name: 'Shoaib',
  position: 'programmer'
}
let newArr = [1,2,3,4]
  return (
    <>
      <h1 className='mb-4 bg-green-400 rounded-xl p-4'>Tailwind</h1>
     <Card channelName='hustlingcode' someObj = {myObj} someArr = {newArr} btnText='visit me'/>
     <Card channelName = "Shoaib" btnText = "click me"/>
    </>
  );
}

export default App;
 