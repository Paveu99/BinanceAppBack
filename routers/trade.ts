import Router from 'express'
import {getData} from "../utils/db2";
import {TradeRecord} from "../records/trade.record";
import {AddNewFavourite} from "../types/trade/trade";
import {ValidationError} from "../utils/errors";

export const tradesRouter = Router();

tradesRouter
    .get('/', async (req, res) => {
        const data = await getData();
        res.json(data);
    })

    .post('/', async (req, res) => {
        const newFavourite = new TradeRecord(req.body as AddNewFavourite);
        await newFavourite.insert();

        res.json(newFavourite);
    })

    .delete('/:id', async (req, res) => {
        const trade = await TradeRecord.getOne(req.params.id);

        if(!trade) {
            throw new ValidationError('No such trade!');
        }

        await trade.delete();

        res.end();
    })