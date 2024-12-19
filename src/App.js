import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import sbc from './MyContract.json';
import Navbar from './components/Navbarr.js';
import Home from './components/Home.js';
import YourProperty from './components/YourProperty.js';
import AddProperty from './components/AddProperty.js';

const abi = sbc;
const contractAddress = '0xefb9db4701b568227f08606f6ced4c0883205724';

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Contracts
  const loadContract = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(myContract);
    } catch (error) {
      console.error('Error loading contract:', error);
      alert('Error loading contract. Please check console for details.');
    }
  }, []);

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      setIsLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      await loadContract();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [loadContract]);

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, [connectWallet]);

  return (
    <Router>
      <div className="p-4">
        <Navbar account={account} connectWallet={connectWallet} isLoading={isLoading} />
        <Routes>
          <Route path="/" element={<Home contract={contract} account={account} />} />
          <Route path="/add-property" element={<AddProperty contract={contract} account={account} />} />
          <Route path="/your-property" element={<YourProperty contract={contract} account={account} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

