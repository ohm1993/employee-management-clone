const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const userService = require('../services/user.service');
const auth=require('../middleware/auth');
router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/',auth,getAll);
router.get('/:_id', auth, getCurrent);
router.delete('/:_id', auth, _delete);
router.put('/:_id', auth, update);
router.post('/sendemail', sendEmailToAllAdmin);

function sendEmailToAllAdmin(req, res){
    userService.getAllAdmin()
        .then(function (emails) {
            let allemail = [];
            for(var i=0; i < emails.length; i++){
                allemail.push(emails[i].email);
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'ohmraj2393@gmail.com',
                  pass: '' // naturally, replace both with your real credentials or an application-specific password
                }
            });
            const mailOptions = {
            from: req.body.email,
            to: allemail.toString(),
            subject: 'Employee Management',
            text: `Hi a new user has been ${req.body.opname}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
                .then(function(data) {
                    res.send(data);
                })
                .catch(function(err) {
                    res.status(400).send(err);
                });
}

function authenticate(req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(function(user) {
            if (user) {
                req.app.io.emit('shownotification',{message:"a new user is loggedin",user:user});
                res.send(user);
            } else {
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
module.exports = router;