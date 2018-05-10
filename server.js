var express = require('express')
var bodyParser = require('body-parser')

// connect to database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'burgers_db'
});


var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
app.get('/', function(req, res){
  res.render("index")
});

app.get('/grabburgers', function(req, res){

  connection.query('SELECT * from burgers', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    res.json(results);
  });

});

app.listen(PORT, function () {
    connection.connect();
    console.log("Server listening on: http://localhost:" + PORT);
});
