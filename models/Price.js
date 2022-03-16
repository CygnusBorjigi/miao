const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: true 
	},
	obtainedTime: { 
		date: { type: String },
		time: { type: String }
	},
	createdTime: { 
		type: Date, 
		default:Date.now 
	},
	price: { 
		type: String,  
		required: true
	}
});

module.exports = mongoose.model('Price', PriceSchema);
