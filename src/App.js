import React, { useEffect, useState } from 'react';
import './App.css';
import Maker from '@makerdao/dai';

function App() {

  // Set callback to state
  const [maker, setMaker] = useState({})
  // Set eth address
  const [address, setAddress] = useState('')
  const [value, setValue] = useState('')
  // Set loading and loaded states
  const [loaded, setLoaded] = useState(false)

  // Access web3 browser provider to create Maker
  const createMaker = async () => {
    return await Maker.create('browser', {});
  }

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

    // TODO: Sample DAI Interactions/ Savings rate
    /*
    const cdp = await makerInstance.openCdp();
    const info = await cdp.getInfo();
    console.log(info);
    */
    // TODO: Try this examples: https://github.com/makerdao/dai.js/blob/dev/packages/dai/README.md#commands
    // TODO: https://docs.makerdao.com/building-with-maker/daijs/getting-started

 
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
