const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodItemSchema = new Schema(
	{
		item_name: {
			type: String,
			required: true
		},
		item_type: {
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		},
		item_id: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const FoodItems = mongoose.model('FoodItems', foodItemSchema);

module.exports = FoodItems;
