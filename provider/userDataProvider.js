const fs = require('fs');
const uniqid = require( 'uniqid')
let users = require('../data/users.json');

const userDataProvider = {
    getAll: () => ( users ),
    getById: (id) => ( users.find(x => x.id.toString() === id.toString()) ),
    find: (x) => ( users.find(x) ),
    create,
    update,
    delete: _delete
};

function create(user) {
    user.id = uniqid();
    user.imgUrl = '';
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    users.push(user);
    saveData();
    return user;
}

function update(id, params) {
    const user = users.find(x => x.id.toString() === id.toString());

    user.dateUpdated = new Date().toISOString();

    Object.assign(user, params);
    saveData();
    return user;
}

function _delete(id) {
    users = users.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}


export default userDataProvider;