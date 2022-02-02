import React, {useState, useContext, useRef} from 'react';
import Link from 'next/link';
import { FaFacebook, FaLinkedinIn, FaGoogle, FaRegEnvelope, FaUserAlt } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useRouter } from 'next/router'
import {useAppContext} from '../stores/appContext';

const Login = () => {
    const { user, login} = useAppContext();
    const router = useRouter()
    
    const usernameRef = useRef('admin');
    const passwordRef = useRef('123');

    const handleClick = (e) =>{
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
     
        login(username, password)
    }

  if(user) router.push('/')
  
  return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gary-100">
    
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
        <div className='w-3/5 p-5'>
          <div className='text-left font-bold'><span className='text-red-500'>PowerLine</span><br></br>Plus</div>
          <div className='py-10'>
            <h3 className='text-3xl font-bold text-red-500 mb-2'>Sing in to Account</h3>
            <div className='border-2 w-10 border-red-500 inline-block mb-2'></div>
            <div className='flex justify-center my-2'>
              <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                <FaFacebook className='text-sm'/>
              </a> 
              <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                <FaLinkedinIn className='text-sm'/>
              </a> 
              <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                <FaGoogle className='text-sm'/>
              </a> 
            </div>{/* Social login section */}
            <p className='text-gray-400 py-2'>Please use your email account</p>
            <div className='flex flex-col items-center'>
              <div className='bg-gray-100 w-64 p-3 flex items-center mb-3'>
                <FaUserAlt className='text-gray-400 m-2'/>
                <input type='text' placeholder='Username' name="username" ref={usernameRef} className='bg-gray-100 outline-none text-sm flex-1'/>
              </div>
              <br />
              <div className='bg-gray-100 w-64 p-3 flex items-center mb-3'>
                <MdLockOutline className='text-gray-400 m-2'/>
                <input type="password" placeholder='Password' name="password" ref={passwordRef} className='bg-gray-100 outline-none text-sm flex-1'/>
              </div>
              <div className='flex justify-between w-64 mb-5'>
                <label className='flex items-center text-xs py-2 '>
                  <input type='checkbox' name='remember' className='mr-1'/>Remember me
                </label>
                <a href='#' className='text-xs py-2'>Forgot Password</a>
              </div>
              
              <a href='#' onClick={handleClick} className='border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-gray-200 hover:text-orange-500'>
                Sign in
              </a>
            </div>
          </div>
        </div>{/* sign in section */}
        <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
          <h3 className='text-3xl font-bold'>Hello Elham</h3>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-2'>Please fill up your personal information</p>
            <a  className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-gray-200 hover:text-orange-500'>
                <Link href='/register' className="underline">Sign up</Link>                
            </a>
       
          
        </div>{/* sign up section */}
        </div>
      </main>
    </div>
      </>
    //   <div className="w-full min-h-screen bg-gray-50 flex flex-col md:justify-center items-center  md:-mt-10 p-10 md:pt-0">
    //       <div className="w-full sm:max-w-md pt-5 ">
    //           <h2 className="mb-12 text-center text-3xl text-gray-600 font-extrabold">Login</h2>
    //           <form>
    //               <div className="mb-4">
    //                   <label className="block mb-1" >Username</label>
    //                   <input type="text" name="username" ref={usernameRef}
    //                          className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" 
                             
    //                          />
    //               </div>
    //               <div className="mb-4">
    //                   <label className="block mb-1" >Password</label>
    //                   <input type="password" name="password" ref={passwordRef}
    //                          className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" 

    //                          />
    //               </div>
    //               <div className="mt-6 flex items-center justify-between">
    //                   <div className="flex items-center">
    //                       <input id="remember_me" type="checkbox"
    //                              className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
    //                       <label  className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
    //                   </div>
    //                   <a href="#" className="text-sm"> Forgot your password? </a>
    //               </div>
    //               <div className="mt-6">
    //                   <button  onClick={handleClick}
    //                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
    //                       Sign In
    //                   </button>
    //               </div>
    //               <div className="mt-6 text-center">
    //                   <Link href='/register' className="underline">Sign up for an account</Link>
    //               </div>
    //           </form>
    //       </div>
    //   </div>
    );
};

export default Login;

