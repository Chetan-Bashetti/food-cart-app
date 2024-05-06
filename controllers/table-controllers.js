const asyncHandler = require('express-async-handler');
const Tables = require('../models/tables');

const createNewTable = asyncHandler(async (req, res) => {
	const { tabel_number } = req.body;
	if (tabel_number !== undefined) {
		const newTable = await Tables.create({ tabel_number });
		res.status(200).send({
			message: `Table number ${tabel_number} added successfully`
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
			message: `Table Number ${table.tabel_number} delete successfully`
		});
	} else {
		res.status(404).send({
			message: 'Table not found'
		});
	}
});

const updateTableById = asyncHandler(async (req, res) => {
	const { tabel_number } = req.body;
	if (req.body.tabel_number !== undefined) {
		const table = await Tables.findById(req.params.id);
		if (table) {
			const isExist = await Tables.findOne({ tabel_number });
			if (isExist) {
				res.status(404).send({
					message: `Table number ${tabel_number} already exists.`
				});
			} else {
				table.tabel_number = tabel_number || table.tabel_number;
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

module.exports = {
	createNewTable,
	getAllTables,
	getTableById,
	deleteTableById,
	updateTableById
};
