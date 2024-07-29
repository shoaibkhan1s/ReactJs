import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  // State variables to manage the password generation settings and the generated password
  const [length, setLength] = useState(6); // Password ki length 6 se shuru hoti hai
  const [numberAllowed, setNumberAllowed] = useState(false); // Track karta hai ki numbers allowed hain ya nahi
  const [charAllowed, setCharAllowed] = useState(false); // Track karta hai ki special characters allowed hain ya nahi
  const [password, setPassword] = useState(""); // Generated password ko store karne ke liye state

  // useRef hook ka use karke password input field ko refer karna
  const passwordRef = useRef(null);

  // Password generate karne ka function
  const passwordGenerator = useCallback(() => {
    let pass = ""; // Generate kiye gaye password ko store karne ke liye variable
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Default characters (letters) for the password

    // Agar numbers allowed hain toh unko string mein add karna
    if (numberAllowed) str += "0123456789";

    // Agar special characters allowed hain toh unko string mein add karna
    if (charAllowed) str += "@#$%&*-_~";

    // Password generate karna by randomly selecting characters from the string
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); // Random index get karna
      pass += str.charAt(char); // Random character ko password mein add karna
    }

    setPassword(pass); // Generated password ko state mein set karna
  }, [length, numberAllowed, charAllowed, setPassword]); // useCallback dependencies

  // useEffect hook password generate karne ke liye jab settings change hoti hain
  useEffect(() => {
    passwordGenerator(); // Password generation function ko call karna
  }, [length, numberAllowed, charAllowed, passwordGenerator]); // useEffect dependencies
 
  // Password ko clipboard mein copy karne ki function
  const copyPassword = useCallback(() => {
      passwordRef.current.select(); // Input field ke text ko select karna
      window.navigator.clipboard.writeText(password); // Selected text ko clipboard pe copy karna
    
  }, [password]); // useCallback dependency

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef} // Ref ko input field pe attach karna
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0"
            onClick={copyPassword} // Button click par copyPassword function ko call karna
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value); // Slider input se password length update karna
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev); // Number allowed state toggle karna
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev); // Special characters allowed state toggle karna
              }}
            />
            <label>Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
