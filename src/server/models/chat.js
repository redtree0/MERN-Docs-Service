var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    user : String,
    chatlogs : [{
        from : String,
        to : String,
        time : String,
        timestamp : { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('chat', chatSchema);