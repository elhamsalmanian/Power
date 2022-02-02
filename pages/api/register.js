const bcrypt = require('bcryptjs');
import userDataProvider from '../../provider/userDataProvider';


export default function handler(req, res) {
    const { password, ...user } = req.body;

    if (userDataProvider.find(x => x.username === user.username))
        throw `User with the username "${user.username}" already exists`;

    user.hash = bcrypt.hashSync(password, 10);    

    const data = userDataProvider.create(user);
    return res.status(200).json(data);
}