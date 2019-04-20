import mongoose, {Schema} from 'mongoose';
// import bcrypt from 'bcrypt-as-promised';
var crypto = require('crypto')
const UserSchema = new Schema({
    login: {type: String, unique: true, lowercase: true, index: true},
    password: String
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = crypto.createHash('sha256').update(this.password).digest('base64');
    this.password = hash;
    next();
});

UserSchema.methods.comparePasswords=function (password) {
    const HashPass = crypto.createHash('sha256').update(password).digest('base64');

    return !(this.password !== HashPass);
};

export default mongoose.model('User',UserSchema);