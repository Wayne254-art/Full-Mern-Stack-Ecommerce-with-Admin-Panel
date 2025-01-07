

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAddress from '../components/AddAddress';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const MyAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [openAddAddress, setOpenAddAddress] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    // Fetch data from API
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios({
                  url: SummaryApi.getAddress.url,
                  method: SummaryApi.getAddress.method,
                  withCredentials: true,
                  headers: {
                      "content-type": "application/json"
                  },
                  // response
              });
                setAddresses(response.data.addresses);
                setLoading(false);
            } catch (err) {
                console.erro(err);
                toast.error(err.message);
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios({
              url: `${SummaryApi.deleteAddress.url}/${userId}`,
              method: SummaryApi.deleteAddress.method,
              withCredentials: true,
              headers: {
                  "content-type": "application/json"
              },
              // response
          });
            setAddresses(addresses.filter(address => address.userId !== userId));
            toast.success("Address deleted successfully!");
            // window.location.reload()
        } catch (error) {
            console.error( error);
            toast.error("Deletion Failed");
        }
    };

    const handleSetDefault = async (id) => {
        const updatedAddresses = addresses?.map(address =>
            address._id === id ? { ...address, default: true } : { ...address, default: false }
        );

        setAddresses(updatedAddresses);

        // Optionally, update the backend to reflect the change
        // await axios.patch(`http://localhost:5000/api/addresses/${id}/setDefault`);
    };

    const handleEdit = (id) => {
        // Logic to edit address
        console.log("Edit address:", id);
    };

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;



    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">My Address</h2>
                <button 
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full" 
                    onClick={() => setOpenAddAddress(true)}
                >
                    Add Address
                </button>
            </div>

            {openAddAddress && (
                <AddAddress onClose={() => setOpenAddAddress(false)} />
            )}

            <div className="p-4">
                {addresses && addresses?.map(address => (
                    <div key={address._id} className="border p-4 rounded-md mb-4 shadow bg-white">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold uppercase">{address.firstName} {address.lastName}</h3>
                            <span className="text-green-600 underline font-bold">Delivery To Your Door Step</span>
                        </div>
                        <div className="mt-2">
                            <p><strong>Phone:</strong> {address.phoneNumber}</p>
                            <p><strong>Address:</strong> {address.county}, {address.subcounty}, {address.ward}</p>
                            <p><strong>Apartment:</strong> {address.addressDetails}</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <input 
                                type="checkbox" 
                                checked={address.default} 
                                onChange={() => handleSetDefault(address._id)} 
                                className="mr-2"
                            />
                            <label>Set as default address</label>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button 
                                className="text-red-600 border border-red-600 py-1 px-4 rounded-md hover:bg-red-600 hover:text-white mr-2" 
                                onClick={() => handleDelete(address._id)}
                            >
                                Delete
                            </button>
                            <button 
                                className="text-orange-600 border border-orange-600 py-1 px-4 rounded-md hover:bg-orange-600 hover:text-white" 
                                onClick={() => handleEdit(address._id)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddress;
