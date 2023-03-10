import { useSelector, useDispatch } from "react-redux";  
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../components/GoalCard";
import { getGoals, reset, createGoals } from '../features/goalSlice'
import { toast } from 'react-toastify';
import Loader from '../components/Loader'


const Dashboard = () => {
    const [goalText, setGoalText] = useState({
        goalText: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userAuth)
    const { goals, isLoading, isError, message} = useSelector((state) => state.goal)

    useEffect(() => {
        if(!user) {
            return navigate('/login')
        }
        if(isError) {
            toast.error(message)
            dispatch(reset())
        } 
        dispatch(getGoals())
    }, [user, isError, dispatch]);

    const addGoal = () => {
        dispatch(createGoals(goalText))
        setGoalText({goalText: ""})
    }

    if(isLoading) {
        return <Loader />
    }
    return (
        <section className="dashboard">
            <h1>Set your goals!</h1>
            <div className="container">
                    <input className="goalInput" type="text" placeholder="Set your goal!" onChange={(e)=> setGoalText((prev)=> ({...prev, goalText: e.target.value}))}/>
                <br/>
                <br/>
                <button onClick={addGoal}>Add your goal</button>
            </div>
            <div className="goals">
                {goals.length > 0 ? (goals?.map((goal, i) => (
                    <GoalCard key={i} goal={goal}/>
                ))) : (
                    <h3>You dont have any goals...</h3>
                 )}
            </div>
        </section>
    )
}

export default Dashboard;