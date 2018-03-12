// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var request = require('request');

var headers = {
    'Client-Identifier': process.env.CLIENT
};

var options = [{
    url: 'https://oslobysykkel.no/api/v1/stations',
    headers: headers
}];

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

// request(options[0], callback);


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/stations", function (request, response) {
  response.sendFile(__dirname + '/views/stations.html');
});

app.get("/availability", function (request, response) {
  response.sendFile(__dirname + '/views/availability.html');
});

app.get("/status", function (request, response) {
  response.sendFile(__dirname + '/views/status.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
