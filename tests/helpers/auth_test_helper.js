const { saveAndReturnBaseUserJson } = require('./user_test_helper');
const { UserService } = require('../../service/users');

async function clearUsersAndCreateBaseUser() {
    await UserService.deleteAll();
    await saveAndReturnBaseUserJson();
}

module.exports = {
    clearUsersAndCreateBaseUser
};


