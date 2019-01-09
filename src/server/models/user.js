import mongoose, { Schema } from 'mongoose';
// var Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const saltRounds = 10;

let userSchema = new Schema({
    id : { type: String, required: true, unique: true },
    password :  { type: String, required: true },
});

userSchema.pre('save', function(next) {

    if (this.isNew || this.isModified('password')) {

        const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
} else {
    next();
}
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
        callback(err);
        } else {
        callback(err, same);
        }
    });
}

module.exports = mongoose.model('user', userSchema);