import Router from 'express'
import {getData} from "../utils/db2";
import {TradeRecord} from "../records/trade.record";
import {AddNewFavourite} from "../types/trade/trade";
import {ValidationError} from "../utils/errors";
import {WholeTradeEntity} from "../types";

export const tradesRouter = Router();

tradesRouter

    .get('/', async (req, res) => {
        const trades = await getData();
        const favouriteData = await TradeRecord.listAll();

        const filteredTrades = trades
            .map((el: WholeTradeEntity) => {
                return {
                    symbol: el.symbol,
                    weightedAvgPrice: el.weightedAvgPrice,
                    priceChangePercent: el.priceChangePercent,
                    lastPrice: el.lastPrice,
                    openPrice: el.openPrice,
                    highPrice: el.highPrice,
                    lowPrice: el.lowPrice,
                }
            })
            .sort(function (a: WholeTradeEntity, b: WholeTradeEntity) {
                if (a.symbol < b.symbol) {
                    return -1;
                }
                if (a.symbol > b.symbol) {
                    return 1;
                }
                return 0;
            })
            .filter((el: WholeTradeEntity) => Number(el.weightedAvgPrice) > 0);

        function assigninig(target: TradeRecord, source: WholeTradeEntity) {
            return Object.assign(target, source)
        }

        const favourite = favouriteData
            .map((el) => {
                for (const elElement of filteredTrades) {
                    if (el.symbol === elElement.symbol) {
                        return assigninig (el,elElement)
                    }
                }
            })
            .sort(function (a: WholeTradeEntity, b: WholeTradeEntity) {
                if (a.symbol < b.symbol) {
                    return -1;
                }
                if (a.symbol > b.symbol) {
                    return 1;
                }
                return 0;
            });

        res.json({
            filteredTrades,
            favourite,
        });
    })

    .post('/', async (req, res) => {
        const newFavourite = new TradeRecord(req.body as AddNewFavourite);
        // console.log(req.body)
        const favouriteData = await TradeRecord.listAll()

        const output = favouriteData
            .filter((el) => {
            return el.userId.includes(newFavourite.userId)
        }).filter((el) => {
            return el.symbol.includes(newFavourite.symbol)
        })

        const userOutput = favouriteData
            .filter((el) => {
                return el.userId.includes(newFavourite.userId)
            })
        console.log(favouriteData)
        if (userOutput.length >= 5) {
            return
        } else {
            if(output.length > 0) {
                return
            } else {
                await newFavourite.insert();
                res.json(newFavourite);
            }
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