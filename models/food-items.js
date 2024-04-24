const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodItemSchema = new Schema(
	{
		food_item_name: {
			type: String,
			required: true
		},
		food_item_category: {
			type: String,
			required: true
		},
		food_item_price: {
			type: String,
			required: true
		},
		is_available: {
			type: Boolean,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const FoodItems = mongoose.model('FoodItems', foodItemSchema);

module.exports = FoodItems;
