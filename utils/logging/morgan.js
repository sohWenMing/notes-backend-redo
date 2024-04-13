const morgan = require('morgan');

morgan.token('req-body', (req, res) => {
    return JSON.stringify(req.body);
});

const { http } = require('./logger');
const morganLogger =
morgan(
    'method: :method Content-Type: :req[Content-Type]response time: :response-time response status: :status reqURL: :url user-agent: :user-agent req-body: :req-body',
    {
        stream: { write: (message) => http.http(message.trim()) }
    }
);
module.exports = { morganLogger };