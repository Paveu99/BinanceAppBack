import express, {json} from "express";
import 'express-async-errors'
import cors from 'cors';
import {handleError} from "./utils/errors";
import {tradesRouter} from "./routers/trade";
import {userRouter} from "./routers/user";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());

app.use('/trades', tradesRouter);
app.use('/user', userRouter);

app.use(handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})