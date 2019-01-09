import { io } from './index.js';
import { SEND_MESSAGE , VERIFY, CHATLOG} from '../common/Events.js';
import { createMessage } from '../common/Factory.js';
import { ChatServer } from './ChatServer.js'; 

Map.prototype.pushByKey = function(key, value){
    this.set( this.get( key ),this.get( key ).push(value) );
}
Map.prototype.initKey = function(key){
    if(this.get(key)){
    }else {
        this.set( this.get( key ), new Array() );
    }
    return key;
}

const users = new Map();
const rooms = new Map();
rooms.set("ALL", []);
const chatlogs = [];
var chatserver = null;
var flag = true;
module.exports = function(socket, Chat){
    
    console.log("connected");
    chatserver = new ChatServer(socket);
    chatserver.verify();
    chatserver.whisper();
    chatserver.broadcast();
   
   

  

    //   console.log("Client Successfully Connected");
    //   socket.on(VERIFY, function(data, callback){

    //     let name = data;
    //     if(users.initKey(name)){
    //         socket.name = name;
    //     }
        
    //   })
    
    // //   socket.on('userlists', function(data, callback){
    // //     console.log(users);
    // //     callback();
    // //   });
    
    //   socket.on(SEND_MESSAGE, function(user, data, callback){
    //     console.log(data)
    //     const { name } = data;
    //     const { to } = data;
    //     const { msgtype } = data;
    //     console.log(socket.id);
    
    //     let chatmsg = createMessage(user, "Others", data);
    //     console.log(chatmsg);
    //     users.pushByKey(user, chatmsg);

    //     socket.emit(CHATLOG, chatmsg );
    //     socket.broadcast.emit(CHATLOG, chatmsg );
    //     var chat = new Chat();

    //     if(users.get( name )){
    //         console.log( users.get( name ));
    //         // users.set( users.get( name ), users.get( name ).push(data) );
    //         users.pushByKey(name, data);
    //         console.log( users.get( name ));
            
    //         if (msgtype === "broadcast") {
    //             rooms.pushByKey("ALL", data);
    //             console.log(rooms.get("ALL"));
    //             console.log("in broadcast");
    //             socket.broadcast.emit('chatlog',  data );
                
    //         } else if (msgtype === "unicast"){
             
    //             rooms.pushByKey("ALL", data);
    //             let messages = rooms.get("ALL");
    //             let sortedmessage = messages.filter(function(msg) {
    //                 if (to === msg.to)
    //                     return true;
    //                 if (to == null )
    //                     return true;
    //                 return true;
    //             }); 
    //             socket.emit('chatlog', sortedmessage );
    //             socket.in(to).emit('chatlog', sortedmessage );
    
    
    //         }
          
            
    //     }
    
    //   })
    
    
    
    
    //   socket.on('load:message', function(data, callback){
    //     console.log(data);
    //     chat.findOne({user : data.user} , (err, chatlogs)=>{
    //         if(err) return;
    //         callback(err, chatlogs);
    //     })
    //     // socket.emit("user", );
    //     // io.emit('RECEIVE_MESSAGE', data);
    //   })
    
    //   socket.once('disconnect', function () {
    //     console.log("disconnected");
    //     users.delete(socket.name);
    //   });
      
}