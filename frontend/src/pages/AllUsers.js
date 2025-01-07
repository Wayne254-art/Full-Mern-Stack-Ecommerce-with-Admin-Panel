

import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import axios from 'axios';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        firstname: "",
        lastname: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        try {
            const { data: dataResponse } = await axios({
                url: SummaryApi.allUser.url,
                method: SummaryApi.allUser.method,
                withCredentials: true
            });

            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>No.</th> 
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((el, index) => (
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td className='uppercase'>{el?.firstname}</td>
                            <td className='uppercase'>{el?.lastname}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format('LL')}</td>
                            <td>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                    onClick={() => {
                                        setUpdateUserDetails(el);
                                        setOpenUpdateRole(true);
                                    }}>
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    firstname={updateUserDetails.firstname}
                    lastname={updateUserDetails.lastname}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
