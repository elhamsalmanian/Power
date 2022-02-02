import taskDataProvider from '../../provider/taskDataProvider';
import { useRouter } from 'next/router'

export default function handler(req, res) {
    
    if (req.method === 'POST') {        
        const { ...task } = req.body;           
        taskDataProvider.create(task);
        return res.status(200).json({});
    } 
    else if (req.method === 'GET') {
        
        const { uid } = req.query
     
        let tasks = [];
        if(uid)
            tasks = taskDataProvider.find(d => d.username == uid);
        else
            tasks = taskDataProvider.getAll();

        return res.status(200).json(tasks);
    }
    
   
    
}