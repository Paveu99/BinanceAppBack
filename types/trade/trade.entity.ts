export interface TradeEntity {
    id?: string,
    symbol: string,
    userId: string,
    weightedAvgPrice: string,
    priceChangePercent: string,
    lastPrice: string,
    openPrice: string,
    highPrice: string,
    lowPrice: string,
}

export interface WholeTradeEntity {
    symbol: string,
    priceChangePercent: string,
    weightedAvgPrice: string,
    lastPrice: string,
    openPrice: string,
    highPrice: string,
    lowPrice: string,
}