import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { serverRouter } from './routes/server.routes';
import Database from './db/database';
import './interfaces/express.interface'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(serverRouter);

const database = new Database();
database.connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server start on localhost:${PORT}`);
});