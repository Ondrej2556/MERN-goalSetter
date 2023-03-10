import { configureStore,  } from '@reduxjs/toolkit'
import userAuth from './features/userAuth'
import goal from './features/goalSlice'

export default configureStore({
    reducer: {
        userAuth,
        goal
    }
})