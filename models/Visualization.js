const mongoose = require('mongoose');

const VisualizationSchema = new mongoose.Schema({
	name: { 
		type: String, 
		unique: true 
	},

	width:{
		type:Number,
		default:0
	},

	height:{
		type:Number,
		default:0
	},
	x:[Number],
	y:[Number]
	
	});

module.exports = mongoose.model('Visualization', VisualizationSchema);