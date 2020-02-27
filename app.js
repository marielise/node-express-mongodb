/*
To have launchd start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

app.use(bodyParser.json()); //middleware reading json input

const postRouter = require('./routes/posts');
app.use('/posts', postRouter); //it's called a middleware

app.get('/', (req, res) => {
  res.send('Home page');
});

mongoose.connect(
  process.env.DB_ACCESS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

//start to listen
app.listen(3000, () => console.log('server listening'));
