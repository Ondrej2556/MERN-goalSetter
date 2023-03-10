const express = require('express');
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 8000;
const app = express();
const connectDB = require('./config/db')
const colors = require('colors');


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
connectDB();

app.use('/api/goals', require('./routes/goalRoute'))
app.use('/api/user', require('./routes/userRoute'))



app.listen(PORT, () => console.log('Listening on port ' + PORT))