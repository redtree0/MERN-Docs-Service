import { SEND_MESSAGE , LOAD_MESSAGE, VERIFY, CHATLOG, BROADCAST, WHISPER } from '../common/Events.js';
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
            // ChatServer.chatlogs.remove(self.socket.name);
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
    
    load(){
        loadChatlogEventHandler.apply(this);
    }
}


ChatServer.userTosocketid = new Map();
ChatServer.chatlogs = new ChatLogs();
// ChatServer.getChatlogs =
function loadChatlogEventHandler(){
    let self = this;
    console.log("loadChatlogEventHandler");

    if(self.socket.handshake.session.user){
        
        

        self.socket.on(LOAD_MESSAGE, (data, callback)=>{
            let name = self.socket.handshake.session.user.name;
            // let socketid = ChatServer.userTosocketid.get(name);
            if(ChatServer.chatlogs.getChatLogs(name).length != 0){
                // let chatlogs = ChatServer.chatlogs.getChatLogs(name).concat(ChatServer.chatlogs.getChatLogs(BROADCAST))
                // .sort(function(a, b){ return new Date(a.timestamp) - new Date(b.timestamp) })
                // ;
                let chatlogs = ChatServer.chatlogs.getChatLogs(name);

                console.log(chatlogs);
                console.log("============");
                callback({ 'chatlogs' : chatlogs });
            }
        });
    }
}

function verifyEventHandler(){
    let self = this;
    self.socket.on(VERIFY, function(data, callback){

        let name = data;

        if(ChatServer.chatlogs.initKey(name)){
            self.socket.name = name;
            self.socket.handshake.session.user = {
                name : name
            };
        } 
        ChatServer.userTosocketid.set(name, self.socket.id);
        self.load();
        
        
      })
}

function broadcastEventHandler(){
    let self = this;
    ChatServer.chatlogs.initKey(BROADCAST);

    self.socket.on(BROADCAST, function(from, data, callback){
        
        // let chatmsg = ChatServer.chatlogs.newMessage(from, BROADCAST, data);
        let chatmsg = ChatServer.chatlogs.newBroadcast(from, BROADCAST, data);
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
        
        let socketid = ChatServer.userTosocketid.get(to);
        self.socket.to(socketid).emit(CHATLOG, chatmsg );
        callback(chatmsg);
    });
}



export { ChatServer };