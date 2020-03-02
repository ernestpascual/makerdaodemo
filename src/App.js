import React, { useEffect, useState } from 'react';
import createMaker from './eth/maker';
import './App.css';

function App() {

  const [maker, setMaker] = useState({})
  const [address, setAddress] = useState('')
  const [loaded, setLoaded] = useState(false)

  // Sign tx to permit dapp interaction with MakerDAO dApp
  // TODO: Interaction with maker using the maker instance
  const createMakerInstance = async () => {
    // create maker instance
    const makerInstance = await createMaker();
    // authenticate with the browser
    await makerInstance.authenticate();
    // set address in state with hooks
    setAddress(makerInstance.currentAddress())
    // set loading status
    setLoaded(true)
  }

  // get Maker instance
  useEffect(() => {
    // trigger createMakerInstance to start interacting with Dai.js
    createMakerInstance();
  }, []);



  return (
    <div className="App">
      <h1>MakerDao Example</h1>
      <h5>Address: {loaded ? address : "Connecting.."} </h5>
    </div>
  );  
}

export default App;
