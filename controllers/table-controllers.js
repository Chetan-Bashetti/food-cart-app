const asyncHandler = require('express-async-handler');
const Tables = require('../models/tables');
const Orders = require('../models/orders');

const createNewTable = asyncHandler(async (req, res) => {
	const { table_number } = req.body;
	if (table_number !== undefined) {
		const newTable = await Tables.create({ table_number });
		res.status(200).send({
			message: `Table number ${table_number} added successfully`
		});
	} else {
		res.status(500).send({
			message: 'Unable to create new table, Please try again later'
		});
	}
});

const getAllTables = asyncHandler(async (req, res) => {
	const allTables = await Tables.find();
	if (allTables) {
		res.status(200).send({
			count: allTables.length,
			data: allTables
		});
	} else {
		res.status(404).send({
			message: 'Tables not found'
		});
	}
});

const getTableById = asyncHandler(async (req, res) => {
	const table = await Tables.findById(req.params.id);
	if (table) {
		res.status(200).send({
			data: table
		});
	} else {
		res.status(404).send({
			message: 'Table not found'
		});
	}
});

const deleteTableById = asyncHandler(async (req, res) => {
	const table = await Tables.findById(req.params.id);
	if (table) {
		await table.deleteOne();
		res.status(200).send({
			message: `Table Number ${table.table_number} delete successfully`
		});
	} else {
		res.status(404).send({
			message: 'Table not found'
		});
	}
});

const updateTableById = asyncHandler(async (req, res) => {
	const { table_number } = req.body;
	if (req.body.table_number !== undefined) {
		const table = await Tables.findById(req.params.id);
		if (table) {
			const isExist = await Tables.findOne({ table_number });
			if (isExist) {
				res.status(404).send({
					message: `Table number ${table_number} already exists.`
				});
			} else {
				table.table_number = table_number || table.table_number;
				await table.save();
				res.status(200).send({
					message: 'Table number updated'
				});
			}
		} else {
			res.status(404).send({
				message: 'Table not found'
			});
		}
	} else {
		res.status(404).send({
			message: 'Please add new table number to update'
		});
	}
});

const checkTableAvailability = asyncHandler(async (req, res) => {
	const table = await Tables.findOne({ table_number: req.params.id });
	const order = await Orders.findOne({
		table_number: table.table_number,
		order_status: { $in: ['pending', 'preparing', 'ongoing'] }
	});
	if (order) {
		res.status(200).send({ messge: 'Found', data: order });
	} else {
		res.status(404).send({ messge: 'Not Found' });
	}
});

module.exports = {
	createNewTable,
	getAllTables,
	getTableById,
	deleteTableById,
	updateTableById,
	checkTableAvailability
};
