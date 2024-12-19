import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

const AddProperty = ({ contract, account }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true); // State to toggle between automatic and manual input

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const[pincode,setPincode]=useState('');

  // Function to get current location
  const getCurrentLocation = async() => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);  // Set latitude
          setLongitude(longitude);  // Set longitude
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  useEffect(()=>{

    async function getPincodeFromGoogle(lat, lon) {
      const api="AIzaSyCmK8zRVUPjPxJJoelskfVZWEv36K5mPbs";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length > 0) {
          for (const component of data.results[0].address_components) {
            if (component.types.includes("postal_code")) {
              console.log("pincode ",component.long_name);
              setPincode(component.long_name);
              return component.long_name;
            }
          }
        }
        console.error("No pincode found in response.");
        return null;
      } catch (error) {
        console.error("Error fetching pincode:", error);
        return null;
      }
    }
    getPincodeFromGoogle(latitude,longitude);
  },[latitude,longitude]);
  

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation(); // Get current location if the user chooses to
      // getPincodeFromGoogle(latitude,longitude);
    }
  }, [useCurrentLocation]);

  // List a New Property
  const listProperty = async () => {
    if (!contract || !account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!price || !title || !category || !address || !description) {
      alert('Please fill all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const tx = await contract.listProperty(
        account,
        ethers.parseEther(price), // Price in ETH
        title,
        category,
        imageUrl,
        address,
        description,
        Math.round(latitude * 10**4),  // Convert latitude to scaled integer
        Math.round(longitude * 10**4), // Convert longitude to scaled integer// Convert to integer representation for longitude
        pincode
      );

      await tx.wait();
      alert('Property Listed Successfully!');
      // Reset input fields after listing
      setPrice('');
      setTitle('');
      setCategory('');
      setImageUrl('');
      setAddress('');
      setDescription('');
      setLatitude(null);
      setLongitude(null);
      setPincode(null);
    } catch (error) {
      console.error('Error listing property:', error);
      alert('Error listing property. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">List New Property</h2>
      <div className="space-y-4">
        {/* Option to use current location */}
        <div>
          <label htmlFor="useCurrentLocation" className="flex items-center">
            <input
              type="checkbox"
              id="useCurrentLocation"
              checked={useCurrentLocation}
              onChange={(e) => setUseCurrentLocation(e.target.checked)}
              className="mr-2"
            />
            Use current location
          </label>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price (ETH)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter price in ETH"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium">Property Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter property title"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter property category (e.g., Residential)"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">Property Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter property address"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter property description"
          />
        </div>

        {/* Latitude and Longitude input fields */}
        <div>
          {useCurrentLocation ? (
            <p>Latitude: {latitude ? latitude : 'Fetching...'}</p>
          ) : (
            <>
              <label htmlFor="latitude" className="block text-sm font-medium">Latitude</label>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter latitude"
              />
            </>
          )}
        </div>

        <div>
          {useCurrentLocation ? (
            <p>Longitude: {longitude ? longitude : 'Fetching...'}</p>
          ) : (
            <>
              <label htmlFor="longitude" className="block text-sm font-medium">Longitude</label>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter longitude"
              />
            </>
          )}
        </div>
        <div>
          {useCurrentLocation ? (
            <p>Pincode: {pincode ? pincode : 'Fetching...'}</p>
          ) : (
            <>
              <label htmlFor="pincode" className="block text-sm font-medium">Pincode</label>
              <input
                type="number"
                id="latitude"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Pincode"
              />
            </>
          )}
        </div>


        <button
          onClick={listProperty}
          disabled={isLoading || !account}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? 'Listing...' : 'List Property'}
        </button>
      </div>
    </div>
  );
};

export default AddProperty;
