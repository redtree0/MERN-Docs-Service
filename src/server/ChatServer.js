import { SEND_MESSAGE , VERIFY, CHATLOG, BROADCAST, WHISPER } from '../common/Events.js';
import { ChatLogs } from "./ChatLogs.js";

class ChatServer {
    

    constructor(socket){
        this.socket = socket;

        this.disconnected();
    }

    disconnected(){
        let self = this;
        self.socket.once('disconnect', function () {
            console.log("disconnected");
            // self.chatlogs.delete(self.socket.name);
            ChatServer.chatlogs.remove(self.socket.name);
            ChatServer.userTosocketid.delete(self.socket.name);
        });
    }
    
    verify() {
        verifyEventHandler.apply(this);
    }

    broadcast() {
        broadcastEventHandler.apply(this);
    }

    whisper(){
        whisperEventHandler.apply(this);
    }
   
}


ChatServer.userTosocketid = new Map();
ChatServer.chatlogs = new ChatLogs();


function verifyEventHandler(){
    let self = this;
    self.socket.on(VERIFY, function(data, callback){

        let name = data;
        if(ChatServer.chatlogs.initKey(name)){
            self.socket.name = name;
        }
        ChatServer.userTosocketid.set(name, self.socket.id);
        
        
      })
}

function broadcastEventHandler(){
    let self = this;
    self.socket.on(BROADCAST, function(from, data, callback){
       
        let chatmsg = ChatServer.chatlogs.newMessage(from, BROADCAST, data);

        // this.socket.emit(CHATLOG, chatmsg );
        self.socket.broadcast.emit(CHATLOG, chatmsg );
        callback(chatmsg);
        // this.socket.to(userTosocketid.get(user)).emit(CHATLOG, chatmsg );
    });
}


function whisperEventHandler(){
    let self = this;
    self.socket.on(WHISPER, function(to, data, callback){
        console.log("in whisper to : " + to + " data :  " + data);
        console.log("name " + self.socket.name);
        let from = self.socket.name;
        let chatmsg = ChatServer.chatlogs.newMessage(from, to, data);

        // self.socket.emit(CHATLOG, chatmsg );
        // console.log("to");
        // console.log((to));
        // console.log("self.userTosocketid");
        // console.log(ChatServer.userTosocketid);
        // console.log("self.userTosocketid.get(to)");
        // console.log(ChatServer.userTosocketid.get(to));

        let socketid = ChatServer.userTosocketid.get(to);
        self.socket.to(socketid).emit(CHATLOG, chatmsg );
        callback(chatmsg);
    });
}



export { ChatServer };