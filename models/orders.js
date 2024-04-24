const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		table_number: {
			type: Number,
			required: true
		},
		order_status: {
			type: String,
			required: true
		},
		items_orderd: {
			type: [
				{
					food_item_name: String,
					category: String,
					price: String
				}
			],
			required: true
		},
		total_price: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
