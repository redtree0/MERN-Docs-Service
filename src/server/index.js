import express from 'express';
import utils from "./helpers/utils";
import path from "path";
import dotenv from "dotenv";
import SocketIO from 'socket.io';
import http from 'http';
import fileUpload from 'express-fileupload';

import index from './routes/index';
import { SUCCESS, SEND_MESSAGE, CHATLOG, CREATE_ROOM } from "../common/Events";

import session from 'express-session';
import mongoose from 'mongoose';

global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = express();

let port = process.env.port || 8080 ;

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mern');

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));
app.use(express.json()) // bodyparser;
app.use(express.static(path.resolve(process.cwd(), 'public')))
app.use(fileUpload());

app.get('/api', (req, res) => {
    res.send('Express to the rescue!');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    let userId = req.body.userId;

    res.json({ msg : SUCCESS  });
});

app.use('/', index );

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});

const server = http.createServer(app);
let io = module.exports.io  = new SocketIO(server);

io.set('origins', '*:*');

import Chat from './models/chat.js';
import  SocketManager from './SocketManager';
io.on('connection', SocketManager, Chat);



server.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${port}!`)
});


