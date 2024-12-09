import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import sbc from './MyContract.json';
import Navbar from './components/Navbarr.js';
import Home from './components/Home.js';
import AddProperty from './components/AddProperty.js';

const abi = sbc;
const contractAddress = '0x33d28e8bead0f923943b104a5566e34113e8a664';

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Contract
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
          <Route path="/your-property" element={<AddProperty contract={contract} account={account} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

