export interface TradeEntity {
    id?: string,
    symbol: string,
    userId: string,
    weightedAvgPrice: string,
    priceChangePercent: string,
}

export interface WholeTradeEntity {
    symbol: string,
    priceChangePercent: string,
    weightedAvgPrice: string,
}