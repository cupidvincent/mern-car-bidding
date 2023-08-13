import express from "express";
import dotenv from 'dotenv';
import path from 'path'

import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import connectDB from "./config/db.js";
import { logRequest } from "./utils/requestLogs.js";

import userRoutes from './routes/userRoutes.js'
import AuctionRoutes from './routes/auctionRoutes.js'

dotenv.config();
connectDB()

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(logRequest)

app.use('/api/users', userRoutes)
app.use('/api/auction', AuctionRoutes)

if(process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
  
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else { 
    app.get('/', (req, res) => res.send('Server is Ready'))
}
  

// app.use(notFound)
// app.use(errorHandler)

app.listen(
    port,
    () => console.log(`Server started on PORT: ${port}`)
)