import Router from 'express'
import {getData} from "../utils/db2";
import {TradeRecord} from "../records/trade.record";
import {AddNewFavourite} from "../types/trade/trade";
import {ValidationError} from "../utils/errors";

export const tradesRouter = Router();

tradesRouter
    .get('/', async (req, res) => {
        const trades = await getData();
        const favouriteData = await TradeRecord.listAll();

        res.json({
            trades,
            favouriteData,
        });
    })

    .post('/', async (req, res) => {
        const newFavourite = new TradeRecord(req.body as AddNewFavourite);
        const favouriteData = await TradeRecord.listAll()

        const output = favouriteData
            .filter((el) => {
            return el.userId.includes(newFavourite.userId)
        }).filter((el) => {
            return el.symbol.includes(newFavourite.symbol)
        })

        if(output.length > 0) {
            return
        } else {
            await newFavourite.insert();
            res.json(newFavourite);
        }
    })

    .delete('/:id', async (req, res) => {
        const trade = await TradeRecord.getOne(req.params.id);

        if(!trade) {
            throw new ValidationError('No such trade!');
        }

        await trade.delete();

        res.end();
    })