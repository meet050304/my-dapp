import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ account, connectWallet, isLoading }) => {
  return (
    <div className="mb-4 space-x-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-semibold">Property Marketplace</Link>
        </div>
        <div>
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Home
          </Link>
          <Link to="/add-property" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4">
            Add Property
          </Link>
          <Link to="/your-property" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 ml-4">
            Your Property
          </Link>
        </div>
      </nav>

      <div className="mb-4 space-x-4 mt-4">
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
