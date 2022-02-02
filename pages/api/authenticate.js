import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import getConfig  from 'next/config';
import userDataProvider from '../../provider/userDataProvider';
import departmentDataProvider from '../../provider/departmentDataProvider';

const { serverRuntimeConfig } = getConfig();


export default function handler(req, res) {
    const { username, password } = req.body;
    
    const user = userDataProvider.find(u => u.username === username);

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }
  
    const departmentId = user?.departmentId ? user.departmentId : 0;

    const department = departmentDataProvider.find(d => d.id == departmentId);
   
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return res.status(200).json({
        ...user,
        imgUrl: user.imgUrl.replace('public/',''),
        departmentTitle: department.title,
        token
    });
}