import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { logout,reset as resetUser } from '../features/userAuth'
import { reset as resetGoal} from "../features/goalSlice";
import Popup from 'reactjs-popup';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userAuth)



    const onLogout = () => {
        dispatch(logout())
        dispatch(resetUser());
        dispatch(resetGoal());
        navigate('/');
    }

    return (
        <>
            {user ? (<>
            <nav>
                <Popup trigger={<button className="navButton"> How to use this app</button>} position="bottom">
                    <div>Type your goal into the textarea</div>
                    <br />
                    <div>Press the button to add your goal to the list</div>
                    <br />
                    <div>Edit goal with right click</div>
                    <br />
                    <div>Delete goal with left click</div>
                </Popup>
                <button className="navButton" onClick={onLogout}>Log out</button>
            </nav>
            </>
            ) : (<>
                <nav>
                <Popup trigger={<button className="navButton"> How to use</button>} position="bottom">
                    <div>Login or Register to continue</div>
                    <br />
                    <div>Type your goal into the textarea</div>
                    <br />
                    <div>Press the button to add your goal to the list</div>
                    <br />
                    <div>Edit goal with right click</div>
                    <br />
                    <div>Delete goal with left click</div>
                </Popup>
                <Link className="navButton" to={'/login'}>Login</Link>
                <Link className="navButton" to={'/register'}>Register</Link>
                </nav>
            </>
            )}
        </>
    )
}

export default Navbar;