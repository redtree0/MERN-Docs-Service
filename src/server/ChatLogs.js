
// 유저별 채팅 로그 기록 map class
class ChatLogs {
    // class Chatlogs extends Map {
    // key string , value Object Array
    constructor(){
        this.userTochat = new Map();
        // return this;
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
        if(self.userTochat.get(key)){
        }else {
            self.userTochat.set( key, new Array() );
        }
        console.log("initKey " +  ( key ));
        console.log(self.userTochat);

        return key;
    }

    newMessage(from, to, msg) {
        
        function getTime(date){
            return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`
        }

        let newmsg = {
            'from' : from ,
            'to' : to,
            'message' : msg,
            'time' : getTime( new Date()),
            'timestamp' : new Date()
        }
        
        // mongoose insert 

        this.pushByKey(from, newmsg);

        return newmsg; 
    }

    remove(user) {
        let self = this;

        self.userTochat.delete(user);
    }
}

export { ChatLogs };