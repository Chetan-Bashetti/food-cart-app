const router = require('express').Router();
const {
	createNewOrder,
	getAllOrders,
	getOrdersById,
	updateOrderById,
	deletOrderById
} = require('../controllers/orders-controllers');

router.route('/add-new-order').post(createNewOrder);
router.route('/list').get(getAllOrders);
router.route('/list/:id').get(getOrdersById);
router.route('/update/:id').patch(updateOrderById);
router.route('/delete/:id').delete(deletOrderById);

module.exports = router;
