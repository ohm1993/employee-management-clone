const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const io = require('socket.io')(server);
var db = require('./config/db');
/* db connection code */
mongoose.connect(db.url, function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});
//Middleware for CORS
app.use(cors());
//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', require('./controllers/users.controller'));
app.io = io;
io.sockets.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
        console.log('message is : ' + msg);
    });
    socket.emit("messageSent", 'emiting messagesent');
});
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = server;