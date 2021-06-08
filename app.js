const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// module.exports.x = 5;

app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/weatherInput.html")
})

app.post("/", (req, res)=>{

// ******-------Parsing form data-----*******
  const city = req.body.city;

  const APIKey = "717c21fa884c05d17e6fef56a069b62c";
  const unit = "metric";
  const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + APIKey;

  https.get(weatherURL, (response)=>{

    //*******------Manipulating the response received from api------*******
    response.on('data', (data)=>{

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;

        res.render('weatherInfo', {city: city, temp: temp, description: description});
      // res.write("<h1>It is currently " + description + " </h1>");
      // res.write("The temperature is " + temp);
      // res.send();
      // res.send("The temperature is " + temp + "<h1>It is currently " + description + "</h1");
      // console.log(JSON.parse(data));
    })
  })
  // console.log(weatherData);
  // res.send("response have been recorded.");

})


app.listen(process.env.PORT||3000, ()=>{
  console.log("The Server is up an running...");
})
