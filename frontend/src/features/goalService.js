import axios from 'axios'

const API_URL = 'http://localhost:5000/api/goals'

const getGoals = async(token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

   const message =  await axios.get(API_URL, config) 
   return message.data;
}

const createGoals = async(goalText, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const message = await axios.post(API_URL,goalText,config)
    return message.data
}

const deleteGoal = async(goalId, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    const message = await axios.delete(API_URL + `/${goalId}`, config)

    return message.data
}

const updateGoal = async(goalToUpdate, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    const message = await axios.put(API_URL + `/${goalToUpdate.goalId}`, goalToUpdate, config)

    return message.data
}

const goalService = { getGoals, createGoals, deleteGoal, updateGoal}
export default goalService;