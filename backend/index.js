const express = require('express')
const cors=require('cors')
require('dotenv').config()
const connectDB=require("./config/db")
const router=require('./routes')
const cookieParser = require('cookie-parser')


const app = express()
const PORT = 8080 || process.env.PORT
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/api',router);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
connectDB().then(()=>{
    app.listen(PORT, () => { 
        console.log("Server is running");
    })
})
