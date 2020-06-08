const jwt = require('jsonwebtoken');
const Q = require('q');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
var secret = 'ohm';
var service = {};
service.create = create;
service.authenticate = authenticate;
service.getAll = getAll;
service.update = update;
service.delete = _delete;
service.getById = getById;
service.getAllAdmin = getAllAdmin;
module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
    User.findOne({ email: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if(user){
            user.comparePassword(password, function(err, isMatch) {
                if (err) deferred.reject({ success: false, message: err });
                if(isMatch){
                    var token = jwt.sign({_id:user._id,role:user.role},secret);
                    //var token = jwt.sign({ username: user.name, email: user.email }, secret, { expiresIn: '24h' }); //logged in given user token
                    deferred.resolve({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: token
                    });
                    console.log("user role is",user.role);
                }else{
                    deferred.reject({ success: false, message: 'Could not authenticate password' }); 
                }
            });
        }else{
            deferred.reject({ success: false, message: 'User not found' }); 
        }
       
    });

    return deferred.promise;
}

function create(userParam) {
    var deffered = Q.defer();
    var user = new User();
    user.name = userParam.name;
    user.email = userParam.email;
    user.password = userParam.password;
    user.role = userParam.role || "employee";
    if (userParam.name === null || userParam.name == '' || userParam.password === null || userParam.password == '' || userParam.email === null || userParam.email == '') {
        deffered.reject({ success: false, message: 'Ensure username email and password were provided' });
    } else {
        user.save(function(err) {
            if (err) {
                deffered.reject(err.name + ' ' + err.message);
            } else {
                deffered.resolve({ success: true, message: 'Account registered successfully' });
            }
        });
    }
    return deffered.promise;
}

function getAll(){
    var deferred = Q.defer();
    User.find({role: "employee"}).sort([['name', 1]]).exec(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(users);
    });
    return deferred.promise;
}

function getAllAdmin(){
    var deferred = Q.defer();
    User.find({role: "admin"},{'_id': 0, 'email' :1 }).exec(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(users);
    });
    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    User.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(user);
    });
    return deferred.promise;
}


function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    User.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            User.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // email already exists
                        deferred.reject('email "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            name: userParam.name,
            email: userParam.email,
            role: userParam.role,
        };
        if (userParam.password) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userParam.password, salt);
            set.password = hash;
        }

        User.update(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(doc);
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();
    User.findByIdAndRemove(_id,function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(user);
    });
    return deferred.promise;
}
