const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email:{
		type:String,
		default:''
	},

	password:{
		type:String,
		default:''
	}

	});

UserSchema.methods.generateHash = function(){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);

}

UserSchema.methods.validPassword=function(){
	return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', UserSchema);