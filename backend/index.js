
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path');
const connectDb = require('./config/db')
const routers = require('./routes')
const router = require('./routes')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware to serve the uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials : true
})
)
app.use("/api", routers)


const PORT = 8080 || process.env.PORT

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Database connection established`)
        console.log(`Server Running @ port (http://localhost:${PORT})`)
    })
})