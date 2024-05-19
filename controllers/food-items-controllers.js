const asyncHandler = require('express-async-handler');
const FoodItems = require('../models/food-items');

const addNewFoodItem = asyncHandler(async (req, res) => {
	const { item_name, price, item_id, item_type } = req.body;

	const foodItem = await FoodItems.create({
		item_name,
		price,
		item_type,
		item_id
	});
	if (foodItem) {
		res.status(200).send({ message: 'New food item created successfully' });
	} else {
		res.status(400).send({ message: 'Unable to add new food item' });
	}
});

const getAllFoodItems = asyncHandler(async (req, res) => {
	const food_items = await FoodItems.find();
	if (food_items.length) {
		res.status(200).send({
			count: food_items.length,
			data: food_items
		});
	} else {
		res.status(404).send({
			message: 'Food items not found'
		});
	}
});

const getFoodItemById = asyncHandler(async (req, res) => {
	const food_item = await FoodItems.findById(req.params.id);
	if (food_item) {
		res.status(200).send({
			data: food_item
		});
	} else {
		res.status(404).send({
			message: 'Food item not found'
		});
	}
});

const deleteFoodItemById = asyncHandler(async (req, res) => {
	const food_item = await FoodItems.findById(req.params.id);

	if (food_item) {
		await food_item.deleteOne();
		res.status(200).send({
			message: 'Food item deleted successfully'
		});
	} else {
		res.status(404).send({
			message: 'Food item not found'
		});
	}
});

const updateFoodItemById = asyncHandler(async (req, res) => {
	const food_item = await FoodItems.findById(req.params.id);
	const { item_name, price, item_type, item_id } = req.body;

	if (item_name === '')
		return res.status(500).send({ message: 'Food item name cannot be empty' });
	if (price === '')
		return res.status(500).send({ message: 'Food item price cannot be empty' });
	if (item_type === '')
		return res
			.status(500)
			.send({ message: 'Food item category cannot be empty' });

	if (food_item) {
		food_item.item_name = item_name || food_item.item_name;
		food_item.price = price || food_item.price;
		food_item.item_type = item_type || food_item.item_type;
		food_item.item_id = item_id ? item_id : food_item.item_id;
		await food_item.save();
		res.status(200).send({
			message: 'Fodd item details updated',
			data: food_item
		});
	} else {
		res.status(404).send({
			message: 'Food item not found'
		});
	}
});

module.exports = {
	addNewFoodItem,
	getAllFoodItems,
	getFoodItemById,
	deleteFoodItemById,
	updateFoodItemById
};
