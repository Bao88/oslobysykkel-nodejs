// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const request = require('request');

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Create the header with client identifier and url
// request the data and send it back to client
let headers = {'Client-Identifier': process.env.CLIENT}, url = 'https://oslobysykkel.no/api/v1/';
app.get("/api/oslobysykkel", function (req, response) {
  // console.log("Requested");
  let stationsJSON, availabilityJSON;
  request({url: url+"stations", headers}, function(error, res, stations){
    if( res.statusCode === 401 ){
      console.log("Remember to change process.env.CLIENT to your key!");
      response.status(401);
      response.type("json").send(res.body);
    } else {
      response.status(200);
      stationsJSON = stations;
      request({url: url+"stations/availability", headers}, function(error, res, availabilities){
        availabilityJSON = availabilities;
        response.type("json").send({stations: stations, availability: availabilities});
      });
    }
  });
});

app.get("/api/update", function (req, response) {
  let stationsJSON, availabilityJSON;
  request({url: url+"stations/availability", headers}, function(error, res, stations){
    if( res.statusCode === 401 ){
      console.log("Remember to change process.env.CLIENT to your key!");
      response.status(401);
      response.type("json").send(res.body);
    } else {
      response.status(200);
      response.type("json").send(stations);
    }
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
