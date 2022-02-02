import React, { useState, useEffect, useCallback } from 'react';
import {useAppContext} from '../stores/appContext';

const Calendar = () => {
	const { user, userTasks, loadUserTasks, saveTask} = useAppContext();

	const[month, setMonth] = useState();
	const[year, setYear] = useState();
	const[monthDays, setMonthDays] = useState([]);
	const[blankDays, setBlankDays] = useState([]);
	const[openTaskModal, setOpenTaskModal] = useState(false);
	const[taskTitle, setTaskTitle] = useState('');
	const[taskComment, setTaskComment] = useState('');
	const[taskDate, setTaskDate] = useState('');
	const[taskTheme, setTaskTheme] = useState('blue');
	const[tasks, setTasks] = useState([...userTasks])


    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const themes = [
        {
            value: "blue",
            label: "Blue Theme"
        },
        {
            value: "red",
            label: "Red Theme"
        },
        {
            value: "yellow",
            label: "Yellow Theme"
        },
        {
            value: "green",
            label: "Green Theme"
        },
        {
            value: "purple",
            label: "Purple Theme"
        }
    ];

    


    const initDate = () => {
        let today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
		
        // datepickerValue = new Date(year, month, today.getDate()).toDateString();
    };

    const isToday = (date) =>{
        const today = new Date();
        const d = new Date(year, month, date);

        return today.toDateString() === d.toDateString() ? true : false;
    };

    const showTaskModal = (date) => {
      
		setOpenTaskModal(true);        
        setTaskDate( new Date(year, month, date).toDateString());
    };

    const handleClick_addTask = (e) => {
		e.preventDefault();

        if (taskTitle == '') {			
            return;
        }

        setTasks((oldArray) => [...oldArray,{
            dueDate: taskDate,
            title: taskTitle,
            theme: taskTheme
        }]);
		
        // clear the form data
        setTaskTitle('');
        setTaskDate('');
        setTaskTheme('blue');

        //close the modal
        setOpenTaskModal(false);

		
        saveTask(user.username, taskTitle, taskComment, taskDate, taskTheme, 'running')
    };

    const getNoOfDays = () => {
        let daysInMonth = new Date(year, month , 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(year, month ).getDay();
        let blankdaysArray = [];
        for ( var i=1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        let daysArray = [];
        for ( var i=1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        
        setBlankDays( blankdaysArray );
        setMonthDays( daysArray );
    };

	const handleClick_prevMonth = () =>{
		setMonth(prev => prev - 1); 
		//getNoOfDays()
	};

	const handleClick_nextMonth = () =>{
		setMonth(prev => prev + 1);
		//getNoOfDays()
	};

  

	const selectOnchange = (e) => {
		setTaskTheme(e.target.value);
	}

	useEffect( () => {   			
		loadUserTasks(user.username);
		initDate();              
    },[]);

	useEffect( () => {   		
		
		getNoOfDays()
    },[month]);
	

  return (
   
	<div className="w-screen ">
		<div className="container mx-auto px-4 py-2  md:py-24">
			  			
			<div className=" rounded-lg  shadow-2xl overflow-hidden">

				<div className="flex items-center justify-between  py-2 px-6 bg-gray-200 dark:bg-[#1F1B24]">
					<div >
						<span className="text-lg font-bold text-gray-800 dark:text-gray-200">{new Date(year,month,1).toLocaleString('en-us', { month: 'long' })}</span>
						<span className="ml-1 text-lg text-gray-600 dark:text-gray-400 font-normal">{year}</span>
					</div>
					<div className="border border-[#2A2438] rounded-lg px-1 pt-2" >
						<button 
							type="button"
							className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-[#2A2438] p-1 items-center 
									${month == 0 && 'cursor-not-allowed opacity-25'}
								  `}
							onClick={handleClick_prevMonth}
							disabled={month == 0 ? true : false}
							
							
							
                            >
							<svg className="h-6 w-6 text-gray-500 dark:text-[#827397] inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>  
						</button>
						<div className="border-r border-[#2A2438] inline-flex h-6"></div>		
						<button 
							type="button"
							className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-[#2A2438] p-1
									${month == 11 && 'cursor-not-allowed opacity-25'}
								  `}
							onClick={handleClick_nextMonth}
							disabled = {month == 11 ? true : false}
							
							
							>
							<svg className="h-6 w-6 text-gray-500 dark:text-[#827397] inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>	
						</button>
					</div>
				</div>	

				<div className="-mx-1 -mb-1 ">
					<div className="flex flex-wrap  dark:bg-[#272333] border-slate-900" >
						{
							DAYS.map( (day, index) => {
								return(
									<div className="px-2 py-2 w-[14.26%] h-[40px] " key={index}>
										<div className="text-gray-600 dark:text-gray-200  text-sm uppercase tracking-wide font-bold text-center">
											{day}
										</div>
									</div>
								)
							})
						}					
					</div>

					<div className="flex flex-wrap  border-l">
						{
							blankDays.map( (blankday, index) => {
								return(
									<div key={index}									
										 className="text-center border-b border-gray-200 dark:border-[#393E46] px-4 pt-2  w-[14.26%] h-[120px]"	>
									</div>
								)
							})
						}
						{
							monthDays.map( (date, index) => {
								return(
									<div key={index} className="px-4 pt-2 border-r border-b border-gray-200 dark:border-[#393E46] relative w-[14.26%] h-[120px] bg-white dark:bg-[#352F44]">
										<div 
										    onClick= {() => showTaskModal(date)}	
											className= {`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${isToday(date) == true ? 'bg-blue-500 text-white dark:bg-[#AD62AA]' : 'text-gray-700 hover:bg-blue-200 dark:text-gray-300 dark:hover:bg-[#827397]'} `}
											 
										>
											{date}
										</div>
										<div className="h-[80px] overflow-y-auto mt-1">
										{
											tasks.filter(e => new Date(e.dueDate).toDateString() ===  new Date(year, month, date).toDateString() )
												 .map( (task,index) => {
													  return(
														<div key={index}
															className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border 
																		${task.theme === 'blue' && 'border-blue-200 text-blue-800 bg-blue-100' }
																		${task.theme === 'red' && 'border-red-200 text-red-800 bg-red-100' }
																		${task.theme === 'yellow' && 'border-yellow-200 text-yellow-800 bg-yellow-100' }
																		${task.theme === 'green' && 'border-green-200 text-green-800 bg-green-100' }
																		${task.theme === 'purple' && 'border-purple-200 text-purple-800 bg-purple-100' }
																	  `}															
														>
															<p className="text-sm truncate leading-tight">{task.title}</p>
														</div>
													  )
												  })
										}										
										</div>
									</div>
								)
							})
						}
					
					
					</div>
				</div>
			</div>
		</div>

		{ openTaskModal &&
			<div  className={`fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full bg-gray-rgba-60 ${openTaskModal && 'transition duration-700 ease-in-out'}`}>
						
				<div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
					<div className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
						onClick={() => ( setOpenTaskModal(!openTaskModal) )}>
						<svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
						</svg>
					</div>

					<div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
						
						<h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Task Details</h2>
					
						<div className="mb-4">
							<label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Task title</label>
							<input type="text"
								   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 								    
								   value={taskTitle} 
								   onChange={ (e) => setTaskTitle(e.target.value)}
								   />
						</div>
						<div className="mb-4">
							<label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Task comment</label>
							<input type="text"
								   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 								    
								   value={taskComment} 
								   onChange={ (e) => setTaskComment(e.target.value)}
								   />
						</div>
						<div className="mb-4">
							<label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Task date</label>
							<input type="text"
								   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
								   value={taskDate} readOnly />
						</div>

						<div className="inline-block w-64 mb-4">
							<label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Select a theme</label>
							<div className="relative">
								<select onChange={selectOnchange}  value={taskTheme}
										className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700">
										{
											themes.map((theme, index) => {
												return(
													<option key={index} value={theme.value} >{theme.label}</option>
												)
											})
										}									
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
								</div>
							</div>
						</div>
	
						<div className="mt-8 text-center">
							
							<button type="button" className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4  rounded-lg shadow-sm" 
									onClick={ handleClick_addTask }>
								Save Task
							</button>	
						</div>
					</div>
				</div>
			</div>
		}
	</div>


  );
};

export default Calendar;
