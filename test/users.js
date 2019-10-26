const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('/GET user', () => {
    it('it should get all users', (done) => {
        chai.request(app)
        .get('/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });

    it('it should get user with valid id', (done) => {
        chai.request(app)
            .get('/users/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should not get a user with invalid id', (done) => {
        chai.request(app)
            .get('/user/101')
            .end((err, res) => {
                res.should.have.status(404);
                done();
             });
    });
});
    

describe('/POST user', () => {
    it('it sould post the user info', (done) => {
        const user = {
            username: "testUsername",
            name: "TestName",
            lastname: "TestLastname",
            email: "test.test@gmail.com",
            password: "123456"
        };
        
        chai.request(app)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
});

describe('/PUT/:id user', () => {
    it('should not update the user info', (done) => {
        const user = {
            firstName: "FailName.",
            lastName: "FailLastName",
        }

        chai.request(app)
            .put('/users/2')
            .send(user)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                
                done();
            });
    });

    it('should update the user info', (done) => {
        const user = {
            username: 'newUsername',
        }
        chai.request(app)
            .put('/users/1')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
    });
});