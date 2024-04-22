const jwt = require('jsonwebtoken');


function getTokenFromRequest(req) {
    console.log("request headers", req.headers);
}

module.exports = {
    getTokenFromRequest
};
