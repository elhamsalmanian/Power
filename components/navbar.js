import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {useAppContext} from '../stores/appContext';
import eliImg from  '../public/images/usersImages/eli.png'
import { useTheme } from 'next-themes'
import { BsSunFill, BsSun} from 'react-icons/bs'

const Navbar = () => {
    const { user, logout } = useAppContext()
    const [isMounted, setIsMounted] = useState(false);

    const[menuOpen, setMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    
    useEffect(() => {
        setIsMounted(true);
      }, []);

    const switchTheme = () => {
    if (isMounted) {
        setTheme(theme === "light" ? "dark" : "light");
    }
    };

    const handleLogin = () => {

    }

    return (
        <nav className="bg-gray-200 dark:bg-[#1F1B24] shadow-lg ">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            {/* Website Logo */}
                            <a href="#" className="flex items-center py-4 px-2">
                                {/* <Image src="" alt="Logo" className="h-8 w-8 mr-2"/> */}
                                    <span className="font-semibold text-gray-500 dark:text-gray-300 text-lg">POWERLINE</span>
                            </a>
                        </div>
                        {/* Primary Navbar items */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link href="/"><a className="py-4 px-2 text-gray-800 dark:text-gray-400 border-b-4 border-[transparent] font-semibold hover:text-pink-500 dark:hover:text-pink-500 hover:border-pink-500 active:text-pink-500 active:border-pink-500 focus:border-pink-500  ">Login</a></Link>
                            {
                                user &&                                 
                                    <>
                                        <Link href="/calendar"><a className="py-4 px-2 text-gray-800 dark:text-gray-400 border-b-4 border-[transparent] font-semibold hover:text-pink-500 dark:hover:text-pink-500  hover:border-pink-500 active:text-pink-500 active:border-pink-500 focus:border-pink-500  transition duration-300">Tasks Calendar</a></Link>
                                        <Link href="/userTasks"><a className="py-4 px-2 text-gray-800 dark:text-gray-400 border-b-4 border-[transparent]  font-semibold hover:text-pink-500 dark:hover:text-pink-500 hover:border-pink-500 active:text-pink-500 active:border-pink-500 focus:border-pink-500  transition duration-300">User Tasks</a></Link>
                                    </>
                                
                            }                            
                           
                        </div>
                    </div>
                    {/* Secondary Navbar items */}
                    <div className="hidden md:flex items-center space-x-3 ">
                        {
                            !user 
                            ?   <>
                                    {/* <Link href='/login'>
                                        <a className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 hover:text-white transition duration-300">Log In</a>
                                    </Link>
                                    <Link href='/register'>
                                        <a className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Register</a>
                                    </Link> */}
                                </>
                            :
                                <>                                       
                                    <div className="relative  overflow-auto p-5 pl-8  w-[350px]">
                                        <div className="flex flex-row items-center overflow-visible relative max-w-sm pr-4  mx-auto bg-white dark:bg-[#2c2739] shadow-lg ring-1 ring-black/5 rounded-xl  gap-5 ">
                                            <div className=' flex items-center grow'>
                                                <img className="absolute -left-6 w-20 h-20 rounded-full shadow-lg  hover:[mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.8))]" alt=""
                                                    //    width={150} height={150}
                                                    src={`${user.imgUrl} `} />
                                                <div className="flex flex-col justify-start py-3 pl-20">
                                                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">{ user.username }</strong>
                                                    <span className="text-slate-500 text-sm font-medium dark:text-slate-400">{ user.departmentTitle || <div>&nbsp;</div>}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button className=" rounded-full " onClick={switchTheme} >
                                                    { theme === "dark" ? <BsSun/> :  <BsSunFill/>  }                                                    
                                                </button>
                                             
                                            </div>
                                            <div>
                                                <a href='#' onClick={ () => logout()} className="py-2 px-3 text-sm text-white  bg-pink-600 dark:bg-[#4a4458] border border-pink-600 dark:border-[#927FBF] rounded-full hover:bg-pink-500 transition duration-300">logout</a>
                                            </div>
                                           
                                        </div>
                                        
                                    </div>                                                                                                                                                                                                                     
                                </>
                        }
                                                         
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={(e) => setMenuOpen(!menuOpen)}>
                            <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                                x-show="!showMenu"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* mobile menu  */}
            <div className={` mobile-menu ${menuOpen ? 'block' : 'hidden' }`}>
                <ul className="">
                    <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                    <li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
                    <li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
                    <li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
                </ul>
            </div>
            
        </nav>
    );
};

export default Navbar;
