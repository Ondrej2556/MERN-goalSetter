import { FaCheck } from "react-icons/fa";
import { useDispatch, } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goalSlice";

const GoalCard = ({goal}) => {
    const dispatch = useDispatch();

    const handleUpdate = () => {
        const newGoalText = prompt("Your new goal text: ")
        
        const goalToUpdate = {
            goalId: goal?._id,
            goalText: newGoalText
        }
        
        dispatch(updateGoal(goalToUpdate))
    }
    return(
        <>
            <div className="card">
                <div className="icon">
                    <FaCheck />
                </div>
                <strong> {goal?.goalText}
                </strong>
                <span onClick={() => dispatch(deleteGoal(goal?._id))} onContextMenu={handleUpdate}>Left click - delete <br /> right click - update</span>
            </div>
        </>
    )
}
export default GoalCard;