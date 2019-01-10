import { io } from './index.js';
import { ChatServer } from './ChatServer.js'; 
import { FileEditor } from './FileEditor.js'; 


var chatserver = null;
var fileEditor = null;

module.exports = function(socket, Chat){
    
    console.log("connected");
    chatserver = new ChatServer(socket);
    chatserver.verify();
    chatserver.whisper();
    chatserver.broadcast();
   
    fileEditor = new FileEditor(socket);
    fileEditor.read();
    fileEditor.write();
      
    socket.on("CHECK_SESSION", (data, callback)=>{
        if(socket.handshake.session.user){
            callback(null, socket.handshake.session.user.name);
        }else{
            callback(new Error("NOT FOUND"));
        }
    });
}