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
        const foundUser = await User.findById(id).populate('notes').exec();
        return foundUser;
    }
    async getAll() {
        const allUsers = await User.find();
        return allUsers;
    }
    async getUserByUserName(username) {
        const foundUserArray = await User.find({ 'username': username });
        if(foundUserArray.length === 0) {
            return null;
        }
        return(foundUserArray[0]);
    }
}

module.exports = {
    UserService: new UserService,
    User: User
};