const express = require('express');
const router = express.Router();
const { getGoals, createGoals, deleteGoal, updateGoal } = require('../controllers/goalController')
const  protect  = require('../middleware/tokenAuth')

router.route('/').get(protect, getGoals).post(protect, createGoals)

router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router;