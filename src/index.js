const express = require('express');
const  bodyParser = require('body-parser');

const app = express();

require("./routes/user.routes")(app);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue à l'API." });
});

// Starting our server.
app.listen(3000, () => {
  console.log(" Server is running on port 3000. ");
});


