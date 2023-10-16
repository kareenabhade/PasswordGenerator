import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
      
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
      <h1>Generate Your Password</h1>

      <div className='head'>
        <input className='password' value={password} ref={passwordRef}></input>
        <button className="button-21" role="button" onClick={copyPassword}>copy</button>
      </div>

      <div className='foot'>
      <input type="range" min="8" max="50"  value={length} onChange={(e) => {setLength(e.target.value)}}/>
      <label for="length">Length:{length}</label>

      <input type="checkbox" id='number' defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
      <label htmlFor='inputNum'>Numbers</label>

      <input type="checkbox" id='character' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
      <label htmlFor='inputChar'>Characters</label>
      </div>
    </>
  )
}

export default App
