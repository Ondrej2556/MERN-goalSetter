import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from '../features/userAuth'
import Loader from '../components/Loader'

const Register = () => {
    const [formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user, isLoading,isSuccess, isError, message } = useSelector((state) => state.userAuth);


    useEffect(()=> {
        isError&& toast.error(message)
        isSuccess&& toast.success("Succesfully registered")
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    },[isError,user, isSuccess, message, dispatch])
    
    const onChange = (e) => {
        setFormData((prev)=> ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = (e)=> {
        e.preventDefault();
        
       dispatch(register(formData))
    } 
    
    if(isLoading) {
        <Loader />
    }
    return (
        <div className="forms">
            <form className="form" onSubmit={handleLogin}>
                <p id="heading">Register</p>
                <div className="field">
                <FaUserAlt />
                <input placeholder="Name" className="input-field" type="text" name="name" onChange={onChange}/>
                </div>
                <div className="field">
                <FaEnvelope />
                <input placeholder="Email" className="input-field" type="email" name="email" onChange={onChange}/>
                </div>
                <div className="field">
                <FaLock />
                <input placeholder="Password" className="input-field" type="password" name="password" onChange={onChange}/>
                </div>
                <div className="btn">
                <button className="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                <button onClick={()=> navigate('/login')} className="button2">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Register;