const express = require('express');
const cors = require("cors")
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '2c7a49a718ad427c825a62e944ee32eb',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 5504;
//this will get the PORT variable from Heroku. However, if one isn't assigned (ex. when we are testing locally) it will ue port 4005.

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});