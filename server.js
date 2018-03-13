// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const request = require('request');

app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Create the header with client identifier and url
// request the data and send it back to client
function respond(response, api){
  let options = {
    url: 'https://oslobysykkel.no/api/v1/' + api,
    headers: {
      'Client-Identifier': process.env.CLIENT
    }
  };
  
  //   fetch data from oslobysykkel by using their API and transfer it to the client
  request(options, function(error, res, body){
    response.status(200);
    response.type("json").send(body);
  });
}

let headers = {'Client-Identifier': process.env.CLIENT}, url = 'https://oslobysykkel.no/api/v1/';
app.get("/api/oslobysykkel", function (req, response) {
  // respond(response, "/stations");
  let stationsJSON, availabilityJSON;
  request({url: url+"stations", headers}, function(error, res, stations){
    response.status(200);
    stationsJSON = stations;
    
    request({url: url+"stations/availability", headers}, function(error, res, availabilities){
      availabilityJSON = availabilities;
      
      response.type("json").send({stations: stations, availability: availabilities});
    });
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
