const express = require('express');
const  bodyParser = require('body-parser');
const  mysql = require('mysql');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nivaMobile'
  });

// Starting our app.
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})


// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {

    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('http://192.168.1.23:3000/users');
});

