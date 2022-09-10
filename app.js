const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("."))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "2100551124b9e14285f00ce6f4f7774f";
  const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const cityName = weatherData.name
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const weatherDescription = weatherData.weather[0].description
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius. Today it looks like the weather will be " + weatherDescription + ".</h1>");
      res.write("<img src=" + imageURL+ ">");

      res.send()
    })
  })

})



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
})
