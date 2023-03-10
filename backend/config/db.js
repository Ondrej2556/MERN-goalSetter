const mongoose = require('mongoose')

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.CON_DB)
        
        console.log(`DB connected to: ${conn.connections[0].name}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error}`.red)
    }
    
}
module.exports = connectDB;