const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('/GET books', () => {
    it('it should get all books', (done) => {
        chai.request(app)
        .get('/books')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });

    it('it should get all books for user with valid id', (done) => {
        chai.request(app)
            .get('/books/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/POST book', () => {
    it('it sould post the book', (done) => {
        const book = {
            title: "test title",
            description: "test description",
            borrowedAt: "2019-10-26",
            borrowedBy: "1",
        };
        
        chai.request(app)
            .post('/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
});