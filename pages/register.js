import React, { useState, useRef } from 'react';
import {useAppContext} from '../stores/appContext';

const Register  = () => {
    const { user, register, departments} = useAppContext();
    
    const [userImageFile, setUserImageFile] = useState('');
    

    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const usernameRef = useRef('')
    const passwordRef = useRef('')
    const departmentRef = useRef(0)
    const fileUploaderRef = useRef(null)
    const uploadedImageRef = useRef(null)

    const handleImageUpload  = (e) => {
        // Assuming only image
        //var file = fileRef.current.files[0];
        const img = e.target.files[0];
        if (img) {
            setUserImageFile( img )
            const {current} = uploadedImageRef;
            current.src = URL.createObjectURL(img);
            const reader = new FileReader();
            
            // current.file = img;
            // reader.onload = (e) => {
            //     current.src = e.target.result;
            // }
            // reader.readAsDataURL(img);
        }

   
    }

    const handleClick = (e) =>{
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const departmentId = departmentRef.current.value;
       
       
        
        register(firstName, lastName, username, password, departmentId, userImageFile )//.then(res => setUserImageFile(null))
    }
    
    return (
        <div className="w-full min-h-screen flex flex-col  items-center sm:justify-center md:-mt-10 p-10 md:pt-0">
            <h2 className="mb-12 text-center text-3xl text-gray-600 font-extrabold">Register</h2>
            <div className=" w-full sm:max-w-[900px] bg-white shadow-md rounded mx-auto px-8 pt-6   flex flex-col my-2">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide   mb-2" >
                            First Name
                        </label>
                        <input ref={firstNameRef} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded py-2 px-3 mb-3" type="text"  />            
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block tracking-wide  mb-2" >
                            Last Name
                        </label>
                        <input ref={lastNameRef} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded py-2 px-3" type="text"  />
                    </div>
                </div>
              
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide  mb-2" >
                            Username
                        </label>
                        <input ref={usernameRef} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded py-2 px-3" type="text"  />
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block tracking-wide  mb-2" >
                            Password
                        </label>
                        <input ref={passwordRef} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-300 rounded py-2 px-3 mb-3" type="password" placeholder="******************" />                       
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    
                    <div className="md:w-1/2 px-3">
                        <label className="block tracking-wide  mb-2" >
                            State
                        </label>
                        <div className="relative flex">
                            <select ref={departmentRef} className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" >
                                {
                                    departments.map( (department) => {
                                        return(<option key={department.id} value={department.id}>{department.title}</option>)
                                    })
                                }                               
                            </select>
                            <div className="pointer-events-none absolute  flex items-center px-2 text-grey-darker top-4 right-0">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide  mb-2" >
                            User Image
                        </label>
                        <input 
                            ref={fileUploaderRef} 
                            type="file" 
                            accept="image/*"   
                            onChange={handleImageUpload }
                            style={{
                                display: "none"
                              }}
                        />
                        <div  className="w-[100px] h-[100px] rounded-full border-2 border-dashed  border-gray-300 p-1"                           
                            onClick={() => fileUploaderRef.current.click()}
                        >                            
                            <img ref={uploadedImageRef}                                
                                className="w-full h-full m-auto rounded-full  border-none outline-0"
                              
                            />            
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5 mb-5">
                      <button  onClick={handleClick}
                               className="w-full md:w-[50%] inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
                          Sign In
                      </button>
                  </div>
            </div>
        </div>
    );
};

export default Register ;
