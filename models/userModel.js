const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

//hash password
userSchema.pre("save", async function(next){
	if(!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
})
//end of password hash

//password match method
userSchema.methods.matchPasswords = async function(password){
	return await bcrypt.compare(password, this.password)
}
//end of password match method

const User = mongoose.model('user', userSchema);
module.exports = User;