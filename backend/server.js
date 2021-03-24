const express = require('express');
var cors = require('cors')
const port = 3001;
const blogRoutes = require('./routes/blog');


//setting up the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

//routes

 app.use(blogRoutes.routes); 

app.listen(port);