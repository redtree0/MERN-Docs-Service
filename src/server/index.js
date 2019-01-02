import express from 'express';
import utils from "./helpers/utils";
import path from "path";
import dotenv from "dotenv";
import SocketIO from 'socket.io';
import http from 'http';
import fileUpload from 'express-fileupload';

import index from './routes/index';
import { SUCCESS } from "../common/Events";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = express();

let port = process.env.port || 8080 ;

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



const server = http.createServer(app);
let io = new SocketIO(server);

io.set('origins', '*:*');

io.on('connection', (err, data) => {

  console.log("Client Successfully Connected");
  io.emit('chat', "hello world");
  
  io.on('SEND_MESSAGE', function(data, callback){
    console.log(data)
    // io.emit('RECEIVE_MESSAGE', data);
  })
  
})

server.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${port}!`)
});