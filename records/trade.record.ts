import {TradeEntity} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid'

type TradeRecordsResults = [TradeRecord[], FieldPacket[]]

export class TradeRecord implements TradeEntity {
    public id?: string
    public symbol: string;
    public userId: string;
    public weightedAvgPrice: string;
    public priceChangePercent: string;

    constructor(obj: TradeEntity) {
        this.id = obj.id
        this.symbol = obj.symbol;
        this.userId = obj.userId;
        this.weightedAvgPrice = obj.weightedAvgPrice;
        this.priceChangePercent = obj.priceChangePercent;
    }

    static async listAll(): Promise<TradeRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `trades`") as TradeRecordsResults;
        return results.map(obj => new TradeRecord(obj))
    }

    static async getOne(id: string):Promise<TradeRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `trades` WHERE `id` = :id", {
            id,
        }) as TradeRecordsResults;
        return results.length === 0 ? null : new TradeRecord(results[0])
    }

    async insert(): Promise<void> {

        if(!this.id) {
            this.id = uuid()
        }
        await pool.execute("INSERT INTO `trades` VALUES(:id, :symbol, :userId, :weightedAvgPrice, :priceChangePercent)", {
            id: this.id,
            symbol: this.symbol,
            weightedAvgPrice: this.weightedAvgPrice,
            userId: this.userId,
            priceChangePercent: this.priceChangePercent,
        })
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `trades` WHERE `id` = :id", {
            id: this.id
        })
    }
}
