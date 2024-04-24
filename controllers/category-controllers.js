const asyncHandler = require('express-async-handler');
const Category = require('../models/categorys');

const createNewCategory = asyncHandler(async (req, res) => {
	const { category_name } = req.body;
	const category = await Category.create({ category_name });

	if (category) {
		res.status(200).send({
			message: `New category ${category_name} added to list`
		});
	} else {
		res.status(400);
		throw new Error('Bad request');
	}
});

const getAllCategorys = asyncHandler(async (req, res) => {
	const allCategories = await Category.find();

	if (allCategories.length) {
		res.status(200).send({
			count: allCategories.length,
			data: allCategories
		});
	} else {
		res.status(404);
		throw new Error('No categories found, Please add new category');
	}
});

const deleteCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById({
		_id: req.params.id
	});
	if (category) {
		await category.deleteOne();
		res.status(200).send({
			message: `Category ${category.category_name} is removed`
		});
	} else {
		res.status(404).send({
			message: 'Category not found'
		});
	}
});

const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById({
		_id: req.params.id
	});
	if (category) {
		res.status(200).send({
			data: category
		});
	} else {
		res.status(404).send({
			message: 'Category not found'
		});
	}
});

const updateCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (!req.body.category_name)
		return res.status(500).send({ message: 'Category name cannot be empty' });
	if (category) {
		category.category_name = req.body.category_name;
		await category.save();
		res.status(200).send({
			message: `Category name updated successfully`
		});
	} else {
		res.status(404).send({
			message: 'Category not found'
		});
	}
});

module.exports = {
	createNewCategory,
	getAllCategorys,
	deleteCategoryById,
	getCategoryById,
	updateCategoryById
};
