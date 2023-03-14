  const express = require("express");
  const app =express();

   const https = require("https");
   const bodyParser= require("body-parser");


   app.use(bodyParser.urlencoded({extended:true}));

  app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");

    })

    app.post("/",function(req,res){
       console.log(req.body.cityName); 
    
    const query =req.body.cityName;
    const apikey= "2ef88dc0b6ea18a810189c5200176000";
    const units="metric";
   const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apikey+"&units="+units+"";
     https.get(url, function(response){

     console.log (response.statusCode);
    
     response.on("data",function(data){
     const weatherData =JSON.parse(data);
     const temp= weatherData.main.temp;

     const weatherDescription = weatherData.weather[0].description;
        console.log(temp);
        console.log(weatherDescription);
     

     const icon = weatherData.weather[0].icon;
     const imgURL= "https://openweathermap.org/img/wn/" + icon+"@2x.png";

        res.write("<p>the weather is currently "+ weatherDescription+" </p>");
      
        res.write("<h1>the temperature in "+query+" is "+ temp+" degrees celcius</h1>");
        res.write("<img src= "+ imgURL+">");
        res.send();
 
     })
 
   })
    })

  





app.listen(3000, function(){


    console.log("server is running on port 3000");
})