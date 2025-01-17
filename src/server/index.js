import express from 'express';
import utils from "./helpers/utils";
import path from "path";
import dotenv from "dotenv";
import SocketIO from 'socket.io';
import http from 'http';
import fileUpload from 'express-fileupload';

import index from './routes/index';
import user from './routes/user';

import session from 'express-session';
import sharedsession from 'express-socket.io-session';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';


global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = express();
const server = http.createServer(app);
let io = module.exports.io  = new SocketIO(server);

let port = process.env.port || 8080 ;

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mern',  { useNewUrlParser: true });

const mySession = session({
    secret: '@#@$MYSIGN#@$#$',
    resave: true,
    saveUninitialized: true
});

app.use(mySession);

io.use(
	sharedsession(mySession, {
		autoSave: true
	})
);

app.use(cookieParser());
app.use(express.json()) // bodyparser;
app.use(express.static(path.resolve(process.cwd(), 'public')))
app.use(fileUpload());


app.use('/', user );
app.use('/', index );

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(process.cwd(), 'public/index.html'));
});




io.set('origins', '*:*');

import Chat from './models/chat.js';
import  SocketManager from './SocketManager';
io.on('connection', SocketManager, Chat);



server.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${port}!`)
});


