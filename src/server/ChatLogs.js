import { BROADCAST } from '../common/Events.js' ;
// 유저별 채팅 로그 기록 map class
class ChatLogs {
    // class Chatlogs extends Map {
    // key string , value Object Array
    constructor(){
        this.userTochat = new Map();
        // return this;
    }
    
    getChatLogs(user){
        return this.userTochat.get(user);
    }
    pushByKey(key, value) {
        let self = this;
        // console.log("new msg " + key);
        // console.log("new msg " + userTochat.get( key ));
        // console.log("new msg value " + value);
        let newChat = self.userTochat.get( key );
        !newChat ? null : newChat.push(value) && self.userTochat.set( key , newChat );
    }
    
    initKey(key) {
        let self = this;

        let flag = true;
        if(self.userTochat.get(key)){
            flag = false;
        }else {
            self.userTochat.set( key, new Array() );
            flag = true;
        }
        // console.log("initKey " +  ( key ));
        // console.log(self.userTochat);
        return flag;
    }

    newMessage(from, to, msg) {
        
        

        let newmsg = {
            'from' : from ,
            'to' : to,
            'message' : msg,
            'time' : getTime( new Date()),
            'timestamp' : new Date()
        }
        
        // mongoose insert 
        if( to === BROADCAST) {
            this.pushByKey(BROADCAST, newmsg);
        }
        this.pushByKey(from, newmsg);

        return newmsg; 
    }

    newBroadcast(from, to, msg){
        let self = this;
        let user = from;

        let newmsg = {
            'from' : from ,
            'to' : BROADCAST,
            'message' : msg,
            'time' : getTime( new Date()),
            'timestamp' : new Date()
        }

        self.userTochat.forEach( (value, key , map)=>{
            // if (key !== user) {
                // self.newMessage(from, to, msg);
                self.pushByKey(key ,newmsg);
            // }
        });
        return newmsg;
    }

    remove(user) {
        let self = this;

        self.userTochat.delete(user);
    }
}

function getTime(date){
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`
}

export { ChatLogs };