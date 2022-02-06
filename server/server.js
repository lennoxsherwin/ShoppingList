const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const routes = require('./routes/base.route');
const cors = require('cors');

// const db = require("app/models");
const Role = require("./models/role");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

const start = async () => {

try{
    await mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");
        
    })
    

        server.listen(port, function () {
            console.info(`Server is up and running on port ${port}`)
        });
} catch(err){
    console.log(err);
}
}

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

start();