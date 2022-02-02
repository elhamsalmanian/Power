
import React, {createContext, useState, useEffect, useContext, useMemo, } from 'react';
import axios from 'axios';
import getConfig from 'next/config'
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const AppContext = createContext()

export const AppContextProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [userTasks, setUserTasks] = useState([])
    const [departments, setDepartments] = useState([])
    const router = useRouter()
  
    useEffect(() => {
        // const user = localStorage.getItem('user');
        // setUser(user)
        if(!user)
            router.push('/')
        getDepartments();
    },[])
    
    const login = async (username, password) =>{
         
        return await axios.post(`${baseUrl}/authenticate`, { username, password })
        .then(res => {        
            const user = res.data;     
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/');
        })
        .catch( (error) => {
            console.log('catch');
            console.log(error);
        });                
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user');
        router.push('/');
    }

    const register = async (firstName, lastName, username, password, departmentId, userImageFile) => {
                
        return await axios.post(`${baseUrl}/register`, { firstName, lastName, username, password, departmentId })
        .then(res => {   
           
            const user = res.data;
         
            const data = new FormData();
            data.append("image", userImageFile);
            data.append("name", user.username);
            data.append("id", user.id);
            
            axios.post(`${baseUrl}/upload`, data, { headers: { 'content-type': 'multipart/form-data' } })
            .then(res => { 
                console.log(res.statusText)
            })

            router.push('/login');    
        })
        .catch( (error) => {
            console.log(error);
        });               
    }
    
    const getDepartments = () =>{
                
        return axios.post(`${baseUrl}/departments`)
        .then( res => {      
           
            setDepartments(res.data); 
        })
        .catch( (error) => {            
            console.log(error);
        });               
    }

    const loadUserTasks = async(username) => {
        return await axios.get(`${baseUrl}/tasks?uId=${ username }` )
        .then( res => {   
            setUserTasks(res.data)            
        })
        .catch( (error) => {            
            console.log(error);
        });   
    }

    const saveTask = (username ,taskTitle, taskComment, taskDate, taskTheme, taskStatus) => {
        return axios.post(`${baseUrl}/tasks`, 
            { 
                username ,
                title: taskTitle, 
                comment: taskComment,
                dueDate: taskDate, 
                theme: taskTheme ,
                status: taskStatus ,
            })
        .then( res => {      
           
            
        })
        .catch( (error) => {            
            console.log(error);
        });   
    }

    // const contextValue = useMemo(() => { 
    //     return {
    //         user, 
    //         login, 
    //         logout, 
    //         register, 
    //         departments,
    //         getDepartments,
    //         userTasks, 
    //         loadUserTasks, 
    //         saveTask
    //     };  
    // }, [user, departments, userTasks]);
    const contextValue = {
                        user, 
                        login, 
                        logout, 
                        register, 
                        departments,
                        getDepartments,
                        userTasks, 
                        loadUserTasks, 
                        saveTask
                    }
    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
	return useContext(AppContext);
}

