const request = require('request');
const endpoint = 'http://localhost:3000/api/books';

const book = {
    id: "100",
    title: "newBook",
    description: "newBook description",
    borrowedAt: "2019-10-26",
    borrowedBy: "1",
};   

const loginEndpoint = 'http://localhost:3000/api/login';

const loginUser = {
    username: "dvidak",
    password: "123123123"
}


describe('/books', () => {
    let token = null;
    beforeEach(function(done){
        request.post(loginEndpoint,{json: true, body: loginUser },function(err, res) {
             token = res.body.token;
             done();
         });
    })

    it('should get all books and return 200 response code', function (done) {
        request.get(endpoint, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should update book', (done) => {
        request.put(`${endpoint}/2`,{json: true, body: {title: 'newTitle'}}, function (error, response) {
            expect(response.statusCode).toEqual(201);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should post book', function (done) {
        request.post(endpoint, {json: true, body: book }, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should not post book if req body is empty', function (done) {
        request.post(endpoint, {json: true, body: {} }, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should return error if someone try to delete book that does not exist', (done) => {
        request.delete(`${endpoint}/105`, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should get book with given id', (done) => {
        request.get(`${endpoint}/100`, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should delete book', (done) => {
        request.delete(`${endpoint}/100`, function (error, response) {
            expect(response.statusCode).toEqual(204);
            done();
        }).setHeader('x-access-token', token);
    });

    it('it should not get book with given id after delete', (done) => {
        request.get(`${endpoint}/100`, function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        }).setHeader('x-access-token', token);
    });
});
