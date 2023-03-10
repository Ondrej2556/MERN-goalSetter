const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get user goals from DB   
// /api/goals GET
// PRIVATE - ONLY LOOGED IN USERS
const getGoals = async (req,res) => {
    try {
        
        const goals = await Goal.find({user: req.user.id})
        if(!goals){
            throw new Error("Something went wrong. Please try again later..");
        }
        res.status(200).json(goals)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
}

//@desc Create goal and save it to DB    
// /api/goals POST
// PRIVATE - ONLY LOOGED IN USERS
const createGoals = async (req, res) => {
    try {
        const { goalText } = req.body;

        if(!goalText) {
            throw new Error('Please provide your goal text ')
        }
    
        const goal = await Goal.create({
            user: req.user.id,
            goalText
        });
    
        if(!goal) {
            
            throw new Error('Something went wrong. Please try again later..')
        }
        const goals = await Goal.find({user: req.user.id})
    
        res.status(201).json(goals)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }

}

//@desc Update goal and save it to DB    
// /api/goals/:id PUT
// PRIVATE - ONLY LOOGED IN USERS
const updateGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        
        const goal = await Goal.findById(goalId)

        const user = await User.findById(req.user.id)

        const { goalText } = req.body;

        if(!goalText) {
            throw new Error('Please provide your goal text ')
        }

        if(!user) {
            throw new Error('User not found')
        }        
        if(!goal) {
            throw new Error(`Goal not found`)
        }

        if(goal.user.toString() !== user.id) {
            throw new Error('User not authorized...This is propably not your goal')
        }
        
        const updatedGoal = await Goal.findByIdAndUpdate(goalId, {goalText}, {new: true})
       
        if(!updatedGoal){
            throw new Error(`Goal not updated`)
        }
        const goals = await Goal.find({user: req.user.id})

        res.json(goals);
        
        
    } catch (error) {
        res.status(400).send(error.message)
    }
    
    
}

//@desc Delete goal from DB    
// /api/goals DELETE
// PRIVATE - ONLY LOOGED IN USERS
const deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        
        const goal = await Goal.findById(goalId)

        const user = await User.findById(req.user.id)

        if(!user) {
            throw new Error('User not found')
        }
        
        if(!goal) {
            throw new Error(`Goal not found`)
        }

        if(goal.user.toString() !== user.id) {
            throw new Error('User not authorized...This is propably not your goal')
        }

        const deletedGoal = await Goal.findByIdAndDelete(goalId)
        
        if(!deletedGoal){
            throw new Error(`Goal not updated`)
        }
        
        res.json(deletedGoal._id);
        
        
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

module.exports = { getGoals, createGoals, updateGoal, deleteGoal}