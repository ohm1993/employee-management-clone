const jwt = require('jsonwebtoken');
const role = require('./role');
var secret = 'ohm';
module.exports = function (req, res, next) {
    const token = req.header('authorization'); if (!token) return res.status(401).send('Access Denied: No Token Provided!');
    try {
        const decoded = jwt.verify(token, secret); if (role[decoded.role].find(function (url) { return url == req.baseUrl })) {
        req.user = decoded
            next();
        }
        else
            return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    }
    catch (ex) {
        res.status(401).send('Invalid Token')
    }
}