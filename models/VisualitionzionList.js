const mongoose = require('mongoose');

const VisualitazionListSchema = new mongoose.Schema({
	email:{
		type:String,
		default:''
	},

	password:{
		type:String,
		default:''
	}

	});

module.exports = mongoose.model('VisualitionzionList', VisualitazionListSchema);