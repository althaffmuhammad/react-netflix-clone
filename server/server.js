import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import UserRoutes from './routes/UserRoutes.js';

dotenv.config ();

const app = express ();

const PORT = process.env.PORT || 5000;

connectToMongoDB ();

app.use (cors ());
app.use (express.json ());

app.use ('/api/user', UserRoutes);

app.listen (PORT, console.log (`server is on in ${PORT}`));
