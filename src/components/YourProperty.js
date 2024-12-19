import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const YourProperty = ({ contract, account }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch properties when the component mounts or the account changes
  useEffect(() => {
    const fetchProperties = async () => {
      if (!contract || !account) return;

      setIsLoading(true);
      try {
        const propertyList = await contract.getProperty(account);
        setProperties(propertyList);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Error fetching properties. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [contract, account]);

  // Render properties
  const renderProperties = () => {
    // Filter out properties with price 0.0 ETH
    const filteredProperties = properties.filter(property => {
      const priceInEth = ethers.formatEther(property.price);
      return parseFloat(priceInEth) > 0.0;
    });

    if (filteredProperties.length === 0) {
      return <p>No properties found.</p>;
    }

    return filteredProperties.map((property, index) => (
      <div key={index} className="border p-4 mb-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p><strong>Category:</strong> {property.category}</p>
        <p><strong>Price:</strong> {ethers.formatEther(property.price)} ETH</p>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Pincode:</strong> {property.pincode}</p>
        <div>
          {property.imageUrl ? (
            <img src={property.imageUrl} alt="Property" className="w-full h-auto mt-2" />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Properties</h2>
      {isLoading ? (
        <p>Loading properties...</p>
      ) : (
        renderProperties()
      )}
    </div>
  );
};

export default YourProperty;
