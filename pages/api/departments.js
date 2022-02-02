
import departmentDataProvider from '../../provider/departmentDataProvider';


export default function handler(req, res) {
    
    const departments = departmentDataProvider.getAll();
   
    return res.status(200).json(departments);
}