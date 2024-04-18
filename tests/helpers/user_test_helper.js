const { UserService } = require('../../service/users');
const baseUser = {
    username: 'baseUser',
    name: 'Base User',
    password: 'baseuser'
};

const listOfUsers = [
    {
        username: 'SohWenMing',
        name: 'Soh Wen Ming',
        password: 'Holoq123holoq123'
    },
    {
        username: 'SarahLin',
        name: 'Soh Jane Lin',
        password: 'Gyrotonic'
    },
];

const http = require('../httpModule');

async function saveAndReturnBaseUserJson() {
    const savedUser = await http.post('/api/users')
        .send(baseUser)
        .expect('Content-Type', /application\/json/);
    return savedUser.body;
}

async function getUserIdString(id) {
    const foundUser = await UserService.findById(id);
    const foundUserJson = foundUser.toJSON();
    const idToString = foundUserJson.id.toString();
    return idToString;
}

module.exports = {
    baseUser, listOfUsers, saveAndReturnBaseUserJson, getUserIdString
};