const fs = require('fs');

let departments = require('../data/departments.json');

const departmentDataProvider = {
    getAll: () => ( departments ),
    getById: (id) => ( departments.find(x => x.id.toString() === id.toString()) ),
    find: (x) => ( departments.find(x) ),
    create,
    update,
    delete: _delete
};

function create(department) {
    department.id = departments.length ? Math.max(...departments.map(x => x.id)) + 1 : 1;

    departments.push(department);
    saveData();
}

function update(id, params) {
    const department = departments.find(x => x.id.toString() === id.toString());

    department.dateUpdated = new Date().toISOString();

    Object.assign(department, params);
    saveData();
}

function _delete(id) {
    departments = departments.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('data/departments.json', JSON.stringify(departments, null, 4));
}


export default departmentDataProvider;