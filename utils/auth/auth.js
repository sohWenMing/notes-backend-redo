const jwt = require('jsonwebtoken');
const { UserService } = require('../../service/users');
const { errorCreateAndThrow } = require('../error_utils/errorUtils');

const { SECRET } = require('../config');

function signToken(data) {
    const token = jwt.sign(data, SECRET, {expiresIn: 60 * 60});
    return token;
}

async function verifyToken(token) {
    const decoded = jwt.verify(token, SECRET);
    const username = decoded.username;
    const foundUser = await UserService.getUserByUserName(username);
    if(!foundUser) {
        errorCreateAndThrow('UserNotFoundFromToken', `Token ${token} was decoded to userName: ${username} but user with that username could not be found in database.`);
    }
    return foundUser;
}

// decoded:  {
//     username: 'WenMingSoh',
//     name: 'Soh Wen Ming',
//     iat: 1713753554,
//     exp: 1713757154
//   }
// the key value pairs of the object passed in will each become a key value pair of the decoded data

module.exports = { signToken, verifyToken };