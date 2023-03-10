import express from "express";
import dotenv from 'dotenv';
import calendarRouter from './routes/calendar.js';
import './db.js'
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = new express();

app.use(cors())
app.use(express.json())
app.use('/api', calendarRouter);

app.listen(PORT, (e) => {
    if (e) console.log(e);
    console.log(`Server has been started in port ${PORT}`);
})