import { AggregateRequest, AggregateResponse, TickerRequest, TickerResponse } from "@/types";
import { formatDate } from "@/utils";
const baseUrl = "http://localhost:8080/stocks/"
const aggEndpoint = "aggregate";
const tickerEndpoint = "ticker";

export const getAggregateData = async (
    request: AggregateRequest
): Promise<AggregateResponse[]> => {
    try {
        console.log("hi")
        const queryParams = new URLSearchParams({
            symbol: request.symbol,
            timespan: request.timespan,
            from: request.from,
            to: request.to,
        });

        const fullUrl = `${baseUrl + aggEndpoint}?${queryParams.toString()}`;
        console.log(fullUrl);
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        const formattedData: AggregateResponse[] = data.map((item: any) => ({
            ...item,
            t: formatDate(item.t),
        }));

        return formattedData;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};


export const getTickerData = async (
    request: TickerRequest
): Promise<TickerResponse[]> => {
    try {
        const queryParams = new URLSearchParams({
            symbol: request.symbol,
        });

        const fullUrl = `${baseUrl + tickerEndpoint}?${queryParams.toString()}`;
        console.log("URL" + fullUrl);
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: TickerResponse[] = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
