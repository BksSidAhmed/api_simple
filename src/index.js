const express = require('express');
const  bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

// database
const db = require("./models");
const Role = db.role;

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue à l'API." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Starting our server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(" Server is running on port 3000. ");
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
}

