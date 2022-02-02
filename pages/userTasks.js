import React, {useState, useEffect} from 'react'
import {useAppContext} from '../stores/appContext';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../components/Table'  // new



function UserTasks() {
  const { user, userTasks, loadUserTasks } = useAppContext();
  const[tasks, setTasks] = useState([]);

  const username = user.username;
  if(!username)
    return(<div></div>);

  const getTasks =  () => {

    const getDateDiffByDay = (date1, date2) => {
      var msDiff = new Date(date1).getTime() - new Date(date2).getTime();
      var days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      days = (days < 0) ? '-' : days;
      return days;
    } 

    const getImageUrl = (theme) => {
      switch(theme)
      {
        case 'blue':
          return '/images/blue.png'
        case 'red':
          return '/images/red.png'
        case 'green':
          return '/images/green.png'
        case 'yellow':
          return '/images/yellow.png'
        case 'purple':
          return '/images/purple.png'
        default:
          return null
      }
    } 

    return userTasks.map(item => {
    
        return {
          title: item.title,
          comment: item.comment,
          issuedDate: item.issuedDate,
          dueDate: item.dueDate,
          status: item.status,
          overDue: getDateDiffByDay(new Date(), item.dueDate), 
          tillDue: getDateDiffByDay(item.dueDate, new Date()) ,
          imgUrl : getImageUrl(item.theme)
        }
      })
  } 
      
  useEffect( () =>{    
    loadUserTasks(user.username);    
  },[])


  
  // let dd = await userTasks();
  // console.log('data')
  // console.log(dd)
  
  
  
  const columns = React.useMemo(() => [
    {
      Header: "Task",
      accessor: "title",
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "comment",
    },
    {
      Header: "Issued Date",
      accessor: 'issuedDate',
    },
    {
      Header: "Due Date",
      accessor: 'dueDate',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    
    {
      Header: "Days Over Due",
      accessor: 'overDue',
    },
    {
      Header: "Days Till Due",
      accessor: 'tillDue',
    },  
    // {
    //   Header: "Role",
    //   accessor: 'role',
    //   Filter: SelectColumnFilter,  // new
    //   filter: 'includes',
    // },
  ], [])

  return (
    <div className="min-h-screen ">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">User Tasks ({user.username})</h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={getTasks()} />
        </div>
      </main>
    </div>
  );
}

// const appContextData = (fn) =>  (ctx) =>  {
  
//   const user = 1;
//   const loadUserTasks = 2
//   return fn({ ...ctx,  user, loadUserTasks })
// }

// export const getServerSideProps =  appContextData( async ({ user, loadUserTasks }) => {

//   const data = user + loadUserTasks;  //await loadUserTasks(user.username);

  
//   return { props: { data } }
  
// })

export default UserTasks