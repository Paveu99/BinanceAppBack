import fetch from "node-fetch";

export async function getData() {
    const res = await fetch('https://api2.binance.com/api/v3/ticker/24hr')
    return await res.json();
}