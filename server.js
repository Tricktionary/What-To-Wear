/*
  Weather Clothing App
*/
const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = 3000;

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
  THE KEY BELOW IS FAKE
*/
const WEATHER_API_KEY = '716fe0a975dfabfc1ec9f3dbba04b453' //PUT IN YOUR OWN KEY HERE

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', function(request, response){
  response.sendFile(__dirname + '/views/index.html')
});

//Get Weather
app.get('/weather', function(request, response){
  var city = request.query.city
  if(!city) {
    response.send({
      message: "Please enter a city",
      status : 500,
    });
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
  requestModule.get(url, function(err, res, data){
    response.send(data);
  })
});

//Get TimeZone
app.get('/time',function(request,response){
  var lat = request.query.lat;
  var lon = request.query.lon;

  const url = 'http://api.geonames.org/timezoneJSON?lat='+lat+'&lng='+lon+'&username=tricktionary'
  requestModule.get(url,function(err,res,data){
    response.send(data);
  });
});

//Send A 404 For everything else not found
app.all("*",function(req,res){
  res.sendStatus(404);
});

//Listening on local host 3000
app.listen(3000,function(){
  console.log("Server Running on localhost:3000");
});
