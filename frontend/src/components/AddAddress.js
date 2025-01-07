

import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AddAddress = ({ onClose }) => {
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        county: '',
        subcounty: '',
        ward: '',
        addressDetails: '',
        isDefault: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: SummaryApi.addAddress.method,
                url: SummaryApi.addAddress.url,
                data: address,
                withCredentials: true,  // Ensure cookies are sent with the request
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (response.data.success) {
                toast.success(response.data.message);
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };
    
    
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-md w-full max-w-lg'>
                <h2 className='text-2xl font-semibold mb-4'>Add Address</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            value={address.firstName}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            value={address.lastName}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                        <input
                            type='text'
                            name='phoneNumber'
                            placeholder='Phone Number'
                            value={address.phoneNumber}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                        <input
                            type='text'
                            name='county'
                            placeholder='County'
                            value={address.county}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                        <input
                            type='text'
                            name='subcounty'
                            placeholder='Subcounty/Town'
                            value={address.subcounty}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                        <input
                            type='text'
                            name='ward'
                            placeholder='Area (ward)'
                            value={address.ward}
                            onChange={handleChange}
                            className='border p-2 rounded w-full'
                            required
                        />
                    </div>
                    <textarea
                        name='addressDetails'
                        placeholder='Address Details (e.g., building name, floor, etc.)'
                        value={address.addressDetails}
                        onChange={handleChange}
                        className='border p-2 rounded w-full mt-4'
                        rows='3'
                        required
                    />
                    <div className='flex items-center mt-4'>
                        <input
                            type='checkbox'
                            name='isDefault'
                            checked={address.isDefault}
                            onChange={handleChange}
                            className='mr-2'
                        />
                        <label>Set as default address</label>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <button type='submit' className='bg-red-600 text-white px-4 py-2 rounded'>
                            Submit
                        </button>
                        <button type='button' className='ml-4 bg-gray-300 px-4 py-2 rounded' onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddress;
