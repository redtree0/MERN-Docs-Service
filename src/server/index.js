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

global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = express();

let port = process.env.port || 8080 ;

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
let io = new SocketIO(server);

io.set('origins', '*:*');

const users = new Map();
// const rooms = new Map();
const chatlogs = [];



io.on('connection', (socket) => {
    // console.log(data);
 

  console.log("Client Successfully Connected");
  socket.on('verify', function(data, callback){
    let name = data;
    if ( users.has( name) ) {

    } else {
        users.set(name, new Array());
        console.log(name);
        console.log(users.size);
        socket.name = name;
    }
    // io.emit('RECEIVE_MESSAGE', data);
  })

  socket.on('userlists', function(data, callback){
    console.log(users);
  });

  socket.on('send:message', function(data, callback){
    console.log(data)
    const { name } = data;
    const { to } = data;

    if(users.get( name )){
        console.log( users.get( name ));
        users.set( users.get( name ), users.get( name ).push(data) );
        console.log( users.get( name ));

        // io.emit('chatlog', users.get( name ) ) ;
        // if(data){
        // io.in(to).emit('receive:message', data);
        // io.in(to).emit('chatlog', users.get( name ) ) ;
        // }
        // io.emit('receive:message', users.get( data.name )) ;
        let message = (users.get( name ).concat(users.get( to )));
        let sortedmessage = message.sort(function(a,b) {return new Date(b.timestamp) - new Date(a.timestamp) }); ;
        io.emit('chatlog', sortedmessage ) ;
        io.in(to).emit('chatlog', sortedmessage ) ;
    }

  })


//   socket.on('receive:message', function(data, callback){
//     console.log("received");
//     console.log(data);
//     const { name } = data;
//     const { to } = data;
//     if(users.get( name )){
//         io.emit('chatlog', users.get( name ) ) ;
//         io.in(to).emit('chatlog', users.get( to ) ) ;
//     }
//     // console.log( users.get( data.name ));
//     // users.set( users.get( data.name ), users.get( data.name ).push(data.message) );
//     // io.emit('chatlog', users.get( data.name )) ;

//   })


  socket.on('load:message', function(data, callback){
    console.log(data);
    // socket.emit("user", );
    // io.emit('RECEIVE_MESSAGE', data);
  })
//   socket.on('send:message', function(data, callback){
//     console.log(data)
//     // io.emit('RECEIVE_MESSAGE', data);
//   })

  socket.once('disconnect', function () {
    console.log("disconnected");
    users.delete(socket.name);
  });
  
})

server.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${port}!`)
});


