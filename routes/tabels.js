const router = require('express').Router();
const {
	createNewTable,
	getAllTables,
	getTableById,
	deleteTableById,
	updateTableById
} = require('../controllers/table-controllers');

router.route('/add-new-table').post(createNewTable);
router.route('/list').get(getAllTables);
router.route('/list/:id').get(getTableById);
router.route('/delete/:id').delete(deleteTableById);
router.route('/update/:id').patch(updateTableById);

module.exports = router;
