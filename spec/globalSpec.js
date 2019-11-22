const server = require('../server');

let serverInstance;

beforeEach(function (done) {
    serverInstance = server.run(done);
});

afterEach(function (done) {
    serverInstance.close(done);
});