const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require('./config/db')
const userRoute = require("./routes/userRoute")
const noteRoute = require("./routes/noteRoute")
dotenv.config()
connectDB();

const app = express()
//middlewares
const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/notes', noteRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`server running on ${PORT} .....`))
