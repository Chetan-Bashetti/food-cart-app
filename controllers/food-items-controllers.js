const asyncHandler = require('express-async-handler');
const FoodItems = require('../models/food-items');

const addNewFoodItem = asyncHandler(async (req, res) => {
	const { food_item_name, food_item_price, is_available, food_item_category } =
		req.body;

	const foodItem = await FoodItems.create({
		food_item_name,
		food_item_price,
		food_item_category,
		is_available
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
	const { food_item_name, food_item_price, food_item_category, is_available } =
		req.body;

	if (food_item_name === '')
		return res.status(500).send({ message: 'Food item name cannot be empty' });
	if (food_item_price === '')
		return res.status(500).send({ message: 'Food item price cannot be empty' });
	if (food_item_category === '')
		return res
			.status(500)
			.send({ message: 'Food item category cannot be empty' });

	if (food_item) {
		food_item.food_item_name = food_item_name || food_item.food_item_name;
		food_item.food_item_price = food_item_price || food_item.food_item_price;
		food_item.food_item_category =
			food_item_category || food_item.food_item_category;
		food_item.is_available = is_available
			? is_available
			: food_item.is_available;
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
