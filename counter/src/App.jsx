import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  const addValue = () => {
    if (counter >= 20) {
      return;
    }
    setCounter(counter +1 )
    /* setCounter(prevCounter => prevCounter + 1);
     setCounter( prevCounter => prevCounter + 1);
     setCounter(prevCounter => prevCounter + 1);*/ //this whole code is use to increase the value by 3.
  };

  const removeValue = () => {
    if (counter <= 0) {
      return;
    }
    setCounter(counter - 1);
  };

  return (
    <>
      <h1>Hello World</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>
      <div>Footer: {counter}</div>
    </>
  );
}


export default App;
 