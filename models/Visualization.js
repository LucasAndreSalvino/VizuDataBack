const mongoose = require('mongoose');

const VisualitazionSchema = new mongoose.Schema({
	email:{
		type:String,
		default:''
	},

	password:{
		type:String,
		default:''
	}

	});

module.exports = mongoose.model('Visualitazion', VisualitazionSchema);