const { User } = require('../db/users');
const { logger } = require('../utils/logging/logger');

class UserService {
    async saveUser(user) {
        const savedUser = await user.save();
        return savedUser;
    }

    async deleteAll() {
        await User.deleteMany();
        logger.info('users table cleared');
    }
    async findById(id) {
        const foundUser = await User.findById(id);
        return foundUser;
    }
    async getAll() {
        const allUsers = await User.find();
        return allUsers;
    }
}

module.exports = {
    UserService: new UserService,
    User: User
};