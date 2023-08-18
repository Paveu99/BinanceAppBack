import Router from 'express'
import {UserRecord} from "../records/user.record";
import {getData} from "../utils/db2";

export const tradesRouter = Router()

tradesRouter
    .get('/', async (req, res) => {
        const data = await getData()
        res.json(data)
    })

    .post('/', async (req, res) => {

    })

    .delete('/', async (req, res) => {

    })