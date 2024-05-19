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
					item_name: String,
					item_id: String,
					item_type: String,
					price: String,
					isSelected: Boolean,
					count: Number
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
