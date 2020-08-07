const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// initialize body parser
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
});

//if (process.env.NODE_ENV === 'production') {
app.use(express.static('public'));
//}
app.listen(config.PORT, function () {
    console.log('Listening for requests..')
});