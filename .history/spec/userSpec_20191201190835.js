const request = require('request');
const loginEndpoint = 'http://localhost:3000/api/login';
const endpoint = 'http://localhost:3000/api/users';

const registerUser = {
    id: "20",
    username: "testUsername",
    name: "TestName",
    lastname: "TestLastname",
    email: "test.test@gmail.com",
    password: "123456"
};   

const loginUser = {
    username: "dvidak",
    password: "123123123"
}

const invalidLoginUser = {
    username: "testUsername",
    password: "invalidPass"
}

describe('/users', () => {
    it('it should register user', function (done) {
        request.post(endpoint, {json: true, body: registerUser }, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should fail on registration when request body is empty', function (done) {
        request.post(endpoint, {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
    });

    it('it should login user', function (done) {
        request.post(loginEndpoint, {json: true, body: loginUser }, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('it should not login user with invalid login data', function (done) {
        request.post(loginEndpoint, {json: true, body: invalidLoginUser }, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
});

describe('logged in', () => {
    let token = null;
    beforeEach(function(done){
        request.post(loginEndpoint,{json: true, body: loginUser },function(err, res) {
             token = res.body.token;
             done();
        }).setHeader('x-access-token', token);
    })

    it('should get all users and return 200 response code', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should get all books borrowed by user with given id', (done) => {
        request.get(`${endpoint}/1`, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should get user with valid id', (done) => {
        request.get(`${endpoint}/1`, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should not get user with invalid id', (done) => {
        request.get(`${endpoint}/100`, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should update user', (done) => {
        request.put(`${endpoint}/2`,{json: true, body: {username: 'newUsername'}}, function (error, response) {
            expect(response.statusCode).toEqual(201);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should delete user', (done) => {
        request.delete(`${endpoint}/20`, function (error, response) {
            expect(response.statusCode).toEqual(204);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should return 404 after user is deleted', (done) => {
        request.get(`${endpoint}/20`, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should not delete if user does not exkist', (done) => {
        request.delete(`${endpoint}/200`, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        }).setHeader('x-access-token', token);
    });
});
