//let mongoose = require("mongoose");
//let User = require('../models/User');
let chai = require('chai');
const expect = require('chai').expect;
let chaiHttp = require('chai-http');
let server = require('../server');
//let should = chai.should();
chai.use(chaiHttp);
const chaiReq = chai.request(server);
let userToken;
//Our parent block
describe('mern_test app test cases', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     // User.remove({}, (err) => { 
    //     //    done();           
    //     // });        
    // });

    it('should register a user', () => {
        return chaiReq
            .post('/users/register')
            .send({
                name: 'testadmin',
                email: 'testadmin12@gmail.com',
                password: 'testadmin123@',
                role:'admin'
            })
            .then((res) => {
                console.log("response value is",res);
                expect(res.body.success).to.equal(true);
            });
    });

    it('should login the user', () => {
        return chaiReq
            .post('/users/authenticate')
            .send({
                email: 'testadmin12@gmail.com',
                password: 'testadmin123'
            })
            .then((res) => {
                userToken = res.body.token;
            });
    });
   
    it('it should GET all the users', (done) => {
        return chaiReq
            .get('/users')
            .set('x-auth-header', userToken)
            .end((err, res) => {
                res.body.should.be.a('array');
            done();
            });
    });
});    
