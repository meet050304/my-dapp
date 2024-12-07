import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Home = ({ contract, account }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  // Fetch Properties
  const fetchProperties = async () => {
    if (!contract) return;

    setIsLoading(true);
    try {
      const props = await contract.getAllProperties();
      setProperties(props);
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Error fetching properties. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Buy Property
  const buyProperty = async (propertyId, price) => {
    if (!contract || !account) {
      alert('Please connect your wallet first');
      return;
    }

    setIsBuying(true);
    try {
      // Get the property details
      const property = await contract.getProperty(propertyId);
      console.log("Property details:", property);
      
      const priceInETH = ethers.formatEther(price);
      const priceInWei = ethers.parseEther(priceInETH);

      // Perform the transaction
      const tx = await contract.buyProperty(account, propertyId, {
        value: priceInWei
      });

      await tx.wait();
      alert('Property bought successfully!');
      fetchProperties(); // Refresh the properties after purchase
    } catch (error) {
      console.error('Error buying property:', error);
      alert('Error buying property. Please check console for details.');
    } finally {
      setIsBuying(false);
    }
  };

  // Open Google Maps with the property's location
  const openGoogleMaps = (latitude, longitude) => {
    // Convert to decimal form (if needed) and open in Google Maps
    const lat = Number(latitude) / 10000;
    const lon = Number(longitude) / 10000;
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchProperties();
  }, [contract]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Properties</h2>
      {isLoading ? (
        <p>Loading properties...</p>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{property.propertyTitle}</h3>
              <p className="text-gray-600">{property.description}</p>
              <p className="text-blue-600 font-medium">
                Price: {ethers.formatEther(property.price)} ETH
              </p>
              <p className="text-sm text-gray-500">
                Owner: {property.owner.slice(0, 6)}...{property.owner.slice(-4)}
              </p>
              
              {/* Add Google Maps Button */}
              {property.latitude && property.longitude && (
                <button
                  onClick={() => openGoogleMaps(property.latitude, property.longitude)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View on Google Maps
                </button>
              )}

              {/* Buy Property Button */}
              <button
                onClick={() => buyProperty(property.productId, property.price)}
                disabled={isBuying || !account}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isBuying ? 'Buying...' : 'Buy Property'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default Home;
