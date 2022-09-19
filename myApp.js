require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//Implement a Root-Level Request Logger Middleware
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use('/public', express.static(__dirname + '/public'));

//Serve an HTML File
app.get('/', function(req, res) {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

//Use the .env File
//Serve JSON on a Specific Route
app.get("/json", (req, res) => {
    const json = { message: "Hello json" };
    json.message = process.env.MESSAGE_STYLE === "uppercase" ? json.message.toUpperCase() : json.message;
const mySecret = process.env['MESSAGE_STYLE']
    res.json(json);
});

//Chain Middleware to Create a Time Server
app.get('/now', function(req, res, next) {
  //req.user = getTheUserSync();  // Hypothetical synchronous operation
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

//Get Route Parameter Input from the Client
app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word});
});

//Get Query Parameter Input from the Client
app.route('/name').get(function(req, res) {
  res.json({ name: `${req.query.first} ${req.query.last}` });
}).post(function(req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});
