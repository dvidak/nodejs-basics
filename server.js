let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let models = require('./config/config');
let cors = require('cors')
let apiRoutes = require('./routes/index.js')
const bookController = require('./controller/Book');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',apiRoutes);


models.sequelize.sync({}).then(() => {
    app.listen(1000, () => {
        console.log('Test - port 1000');
    })
});


module.exports = app; // for testing

