import { io } from './index.js';
import { SEND_MESSAGE , VERIFY, CHATLOG} from '../common/Events.js';
import { createMessage } from '../common/Factory.js';
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
      
}