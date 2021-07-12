const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();
const socket = require("socket.io");


mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req,res)=>{
    res.send('<h1>SocketIo</h1>')
})

const server = app.listen(process.env.PORT || 5000, () =>
  console.log("Port 5000")
);

// socket setup
const io = socket(server, {
  cors: {
    origin: '*',
  }
});


app.io = require('socket.io')();

var TodoSocket = require('./routes/todosocket')(io);
app.use('/api/todosocket',TodoSocket);
