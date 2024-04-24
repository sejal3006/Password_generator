import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Reference to password field

  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) {
    str += "0123456789";
  }
  if (charAllowed) {
    str += "!@#$%^&*()_+"
  }

  for (let i = 0; i < length; i++) {
    const char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
}, [length, numberAllowed, charAllowed]);

const CopyToClipboard = (e)=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
  
}
  useEffect(()=>{
generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
    <div class="container">
      <h1>Password Generator</h1>
      <div class="input-container">
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button onClick={CopyToClipboard}>Copy</button>
      </div>
      <div class="controller">
        <div>
          <input type='range' min={8} max={100} value={length} onChange={(e)=>setLength(e.target.value)} />
          <label id="length" htmlFor='length'>Length:{length}</label>
        </div>
        <div>
          <input type='checkbox' defaultChecked={numberAllowed} onChange={(e)=>{
            setNumberAllowed((prev)=>!prev)
          }}/>
          <label htmlFor='number'>Numbers</label>
        </div>
        <div>
          <input type='checkbox' defaultChecked={charAllowed} onChange={(e)=>{
            setCharAllowed((prev)=>!prev)
          }}/>
          <label htmlFor='character'>Characters</label>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;