import React, { useEffect, useState } from 'react';
import createMaker from './eth/maker';
import './App.css';

function App() {

  const [maker, setMaker] = useState({})
  const [address, setAddress] = useState('')
  const [value, setValue] = useState('')
  const [loaded, setLoaded] = useState(false)

  // Sign tx to permit dapp interaction with MakerDAO dApp
  const createMakerInstance = async () => {
    // create maker instance
    const makerInstance = await createMaker();
    // authenticate with the browser
    await makerInstance.authenticate();
    // set maker in state
    setMaker(makerInstance)
    // set address in state with hooks
    setAddress(makerInstance.currentAddress())
    // Find eth balance
    makerInstance.getToken('ETH')._web3.getBalance(makerInstance.currentAddress()).then(tokenValue => {
      setValue(tokenValue / 1000000000000000000)
    })

    // TODO: DAI balance? Derivative coins balance?
    // TODO: Sample DAI Interactions/ Savings rate
 
    // set loading status for async 
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
      <h5>Value: {loaded ? value : "0"} ETH</h5>

      {loaded ? console.log(maker) : "Loading"}
      
    </div>
  );
}

export default App;
