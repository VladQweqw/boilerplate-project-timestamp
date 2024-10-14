// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', function(req, res) {
  const date = new Date();

    return res.status(200).json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    })
})

app.get("/api/:date", function(req, res) {
  let date_string = req.params.date;
  
  if(date_string.length === 0) {
    date_string = new Date().getTime();
  }
  
  if(!isNaN(date_string)) {
    date_string = Number(date_string)
  }

  try {
    const date = new Date(date_string);

    return res.status(200).json({
      unix: date_string,
      utc: date.toUTCString(),
    })
  }
  catch(err) {
    return res.status(400).json({
      error: err
    })
  }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
