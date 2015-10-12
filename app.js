// TODO
// Research proper MVC for express and methodologies around route and 
// function exporting...possibly sail.js
// Learn more about package.jsona and the greater role it plays in configuration
// Currently using grandma.json for data, replace this with mongo in future example
// get more practice with body-parser --> what is the upload.array() doing

var express = require('express'),
		//add reference to data
		grandma = require('./grandma.json'),
//add require for bodyParser to deal with incoming json
    bodyParser = require('body-parser'),
    multer = require('multer'), // v1.0.5
    upload = multer(); // for parsing multipart/form-data

var app = express();

// use handlebars for templating
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Use static html pages (not dynamic templates)
//app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


function checkIfGrandmaHeardYou(words, res) {
	  if (words === "GOODBYE") {
  	res.json(grandma.goodbye.words);
  } else if (words === words.toUpperCase()) {
  	res.json(grandma.heard.words);
  } else {
  	res.json(grandma.unheard.words);
  }
}
// Route to site toot, serve index.html
app.get('/', function(req, res){
	res.render("index");
});

app.post('/', upload.array(), function(req, res, next) {
  console.log(req.body);
  var words = req.body.words;
  console.log(words);
  
  checkIfGrandmaHeardYou(words, res);
});

// Run application on port 1337 (Use 'node app' to run)
app.listen(1337, function(){
	console.log("Server running on port 1337!");
});
