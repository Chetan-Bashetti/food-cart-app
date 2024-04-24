const router = require('express').Router();
const {
	createNewCategory,
	getAllCategorys,
	deleteCategoryById,
	getCategoryById,
	updateCategoryById
} = require('../controllers/category-controllers');

router.route('/add-new-category').post(createNewCategory);
router.route('/list').get(getAllCategorys);
router.route('/list/:id').get(getCategoryById);
router.route('/delete/:id').put(deleteCategoryById);
router.route('/update/:id').patch(updateCategoryById);

module.exports = router;
