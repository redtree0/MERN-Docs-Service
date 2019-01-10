import ss from 'socket.io-stream'
import fs from 'fs'
import path from 'path'
import { READFILE,  READBUFFER, WRITEFILE }  from '../common/Events.js';


class FileEditor {

    constructor(socket){
        this.socket = socket;
        this.stream = ss.createStream();
    }

    read(){
        readEventHandler.apply(this);
    }

    write(){
        writeEventHandler.apply(this);
    }


}


function writeEventHandler(){
    let self = this;

    self.socket.on(WRITEFILE, (filepath, payload)=>{
        // console.log(WRITEFILE);
        // console.log(payload.buffer);
        let arrayBuffer = (payload.buffer);

        try{
            let buffer = Buffer.from(arrayBuffer); 
            bufferToFile(filepath, buffer);
        }catch(err){
            console.log("ERROR :" + err.message);
        }
        
        function bufferToFile(filepath, buffer){
            // console.log(buffer);
            let writestream = fs.createWriteStream(filepath);
            writestream.write(buffer);
            writestream.end();
        }
    })
}

function readEventHandler(){
    let self = this;

    self.socket.on(READFILE, (filepath)=>{
        console.log("READFILE");
        fileToBuffer(filepath, (err, filebuffer)=>{
            console.log(filebuffer);
            self.socket.emit(READBUFFER, { 'buffer' : filebuffer });
            // self.socket.emit("READBUFFER", { 'context' : filebuffer.toString() });
        })
        
        function fileToBuffer(filepath, callback){
            let readStream = fs.createReadStream(filepath);
            let chunks = [];
        
            readStream.on('error', err => {
                return callback(err);
            });
        
            readStream.on('data', chunk => {
                chunks.push(chunk);
                console.log(chunk);
            });
        
            readStream.on('close', () => {
                return callback(null, Buffer.concat(chunks));
            });
        }
    })
    
}


export { FileEditor }