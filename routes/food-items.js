const router = require('express').Router();
const {
	addNewFoodItem,
	getAllFoodItems,
	getFoodItemById,
	deleteFoodItemById,
	updateFoodItemById
} = require('../controllers/food-items-controllers');

router.route('/add-new-food-item').post(addNewFoodItem);
router.route('/list').get(getAllFoodItems);
router.route('/list/:id').get(getFoodItemById);
router.route('/delete/:id').put(deleteFoodItemById);
router.route('/update/:id').patch(updateFoodItemById);

module.exports = router;
