function run(callback) {

    const express = require('express');
    const bodyParser = require('body-parser')
    const app = express();
    const cors = require('cors');
    const apiRoutes = require('./routes/index.js');

    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/api/',apiRoutes);


    var server = app.listen(3000, function () {
        models.sequelize.sync({}).then(() => {
            app.listen(1000, () => {
                console.log('Test - port 1000');
            })
        });
        

        if (callback) {
            callback();
        }
    });

    server.on('close', function () {
        console.log('closed');
    });

    return server;
}

if (require.main === module) {
    run();
}

exports.run = run;
