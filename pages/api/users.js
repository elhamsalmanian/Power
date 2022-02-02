import userDataProvider from '../../provider/userDataProvider';
import { useRouter } from 'next/router'

export default function handler(req, res) {
    
    if (req.method === 'POST') {        
        const {departmentId} = req.body;           
       // userDataProvider.create(task);
        const tasks = userDataProvider.find(u => u.departmentId==departmentId);
        return res.status(200).json(tasks);
    } 
    else if (req.method === 'GET') {
        
        const { uid } = req.query
     
        let tasks = [];
        if(uid)
            tasks = userDataProvider.find(d => d.username == uid);
        else
            tasks = userDataProvider.getAll();

        return res.status(200).json(tasks);
    }
    
   
    
}