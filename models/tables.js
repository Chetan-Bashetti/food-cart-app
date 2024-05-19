const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema(
	{
		table_number: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Tables = mongoose.model('Tables', tableSchema);

module.exports = Tables;
