const asyncHandler = require('express-async-handler');
const Orders = require('../models/orders');

const createNewOrder = asyncHandler(async (req, res) => {
	const { order_status, items_orderd, table_number } = req.body;

	if (order_status && order_status === '')
		return res.status(400).send({ message: 'Order status is important' });
	if (items_orderd && items_orderd.length === 0)
		return res.status(400).send({ message: 'Add atleast 1 order' });
	if (table_number && table_number === 0)
		return res.status(400).send({ message: 'Table number is required' });

	let totalPrice = items_orderd.reduce(
		(val, next) => parseInt(val) + parseInt(next.price),
		0
	);

	const newOrder = await Orders.create({
		order_status,
		items_orderd,
		total_price: totalPrice,
		table_number
	});

	if (newOrder) {
		res.status(200).send({
			message: `New order created success fully total price is ${totalPrice}`
		});
	} else {
		res.status(400).send({
			message: `Unable to create new order, Please try again`
		});
	}
});

const getAllOrders = asyncHandler(async (req, res) => {
	const allOrders = await Orders.find();

	if (allOrders) {
		res.status(200).send({ count: allOrders?.length, data: allOrders });
	} else {
		res.status(400).send({
			message: 'No orders found, Please create new order'
		});
	}
});

const getOrdersById = asyncHandler(async (req, res) => {
	const order = await Orders.findById(req.params.id);

	if (order) {
		res.status(200).send({ data: order });
	} else {
		res.status(400).send({
			message: 'Order not found'
		});
	}
});

const updateOrderById = asyncHandler(async (req, res) => {
	const { order_status, items_orderd, table_number } = req.body;

	const order = await Orders.findById(req.params.id);
	let totalPrice = 0;
	if (items_orderd) {
		totalPrice = items_orderd.reduce(
			(val, next) => parseInt(val) + parseInt(next.price),
			0
		);
	}

	if (order) {
		order.order_status = order_status || order.order_status;
		order.items_orderd = items_orderd || order.items_orderd;
		order.table_number = table_number || order.table_number;
		order.total_price = totalPrice || order.total_price;
		await order.save();
		res.status(200).send({
			message: 'Order updated successfully'
		});
	} else {
		res.status(400).send({
			message: 'Order not found'
		});
	}
});

const deletOrderById = asyncHandler(async (req, res) => {
	const order = await Orders.findById(req.params.id);
	if (order) {
		await order.deleteOne();
		res.status(200).send({ message: 'Order deleted successfully' });
	} else {
		res.status(404).send({ message: 'Order not found' });
	}
});

module.exports = {
	createNewOrder,
	getAllOrders,
	getOrdersById,
	updateOrderById,
	deletOrderById
};
