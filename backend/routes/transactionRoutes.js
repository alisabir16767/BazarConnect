const express= require('express');
const router=express.Router();
const transactionController=require('../controllers/transactionController');

router.post('/',transactionController.createTransaction);
router.get('/',transactionController.getAllTransaction);
router.get('/:transactionId',transactionController.getById);
router.put('/:transactionId',transactionController.updateTransaction);
router.delete('/:transactionId',transactionController.deleteTransaction);

module.exports = router;