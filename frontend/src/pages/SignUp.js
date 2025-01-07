

import React, { useState } from 'react';
import axios from 'axios';
import LoginIcon from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast} from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmpassword: "",
        Profile: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmpassword) {
            try {
                const { data: dataApi } = await axios({
                    url: SummaryApi.signUP.url,
                    method: SummaryApi.signUP.method,
                    headers: {
                        "content-type": "application/json"
                    },
                    data
                });

                if (dataApi.success) {
                    toast.success(dataApi.message);
                    navigate("/login");
                } else {
                    toast.error(dataApi.message);
                }
            } catch (error) {
                toast.error("Something Went Wrong");
            }
        } else {
            toast.error("Password Doesn't Match");
        }
    };

    const handleUploadImg = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
            ...prev,
            Profile: imagePic
        }));
    };

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.Profile || LoginIcon} alt='login' />
                        </div>
                        <form>
                            <label>
                                <div className='cursor-pointer text-xs bg-opacity-75 bg-slate-200 pb-4 pt-2 py-4 text-center absolute bottom-0 w-full'>
                                    Upload Image
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadImg} required />
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div className='grid'>
                            <label> First Name :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type='text' onChange={handleOnChange} name='firstname' value={data.firstname} placeholder='Field required' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className='grid'>
                            <label> Last Name :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type='text' onChange={handleOnChange} name='lastname' value={data.lastname} placeholder='Field required' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='grid'>
                            <label> Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type='email' onChange={handleOnChange} name='email' value={data.email} placeholder='Enter valid email' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        {/* Password */}
                        <div className='grid'>
                            <label> Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"} onChange={handleOnChange} name='password' value={data.password} placeholder='Enter password' className='w-full h-full outline-none bg-transparent' required />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className='grid'>
                            <label> Confirm Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showConfirmPassword ? "text" : "password"} onChange={handleOnChange} name='confirmpassword' value={data.confirmpassword} placeholder='Confirm Password' className='w-full h-full outline-none bg-transparent' required />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 text-white px-6 py-2 w-fit max-w-[200px] hover:scale-110 transition-all mx-auto block mt-6'>Create Account</button>
                        <p className='my-5'> Already Have an Account? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;
