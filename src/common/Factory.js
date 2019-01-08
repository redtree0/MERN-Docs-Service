function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`
}

function createMessage(from, to, message){
    return {
        from : from ,
        to : to,
        message : message,
        time : getTime( new Date()),
        timestamp : new Date()
    }
}


module.exports = {
	createMessage,
}
