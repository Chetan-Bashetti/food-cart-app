const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tableSchema = new Schema(
	{
		table_id: {
			type: String,
			default: id.generate()
		},
		tabel_number: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Tables = mongoose.Model('Tables', tableSchema);

module.exports = Tables;
