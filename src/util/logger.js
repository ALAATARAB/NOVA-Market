const morgan = require('morgan');
const { getData } = require('./token');

morgan.token('userInfo',(req,res) => {
    try {
        const {userId , email} = getData(req.get('Authorization'));
        return `user Id : ${userId}, user Eamil : ${email}`;
    }
    catch(err) {
        return "user is unAuthrized";
    }
    }
)

const Dev = ':userInfo :method :url :status :response-time ms';
const Tiny = ':method :url :status';
const Combined = 'Address :remote-addr in [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] agent: ":user-agent"';

morgan('dev',{
    // only log the server errors and the client errors
    skip: (req,res) => res.statusCode < 400
});

morgan(Dev,{
    // only log the server errors and the client errors
    skip: (req,res) => res.statusCode < 400
});

function logger(type,stream) {
    switch (type) {
        case 'Dev':
            type = Dev;
            break;
        case 'Tiny':
            type = Tiny;
            break;
        case 'Combined':
            type = Combined;
            break;
    }
    return morgan(type,{stream});
}

module.exports = logger;