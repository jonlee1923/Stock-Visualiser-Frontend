import { TickerRequest, TickerResponse } from "@/types";
import { formatDate } from "@/utils";

const apiUrl = "http://localhost:8080/stocks/ticker";

export const getTickerData = async (
    request: TickerRequest
): Promise<TickerResponse[]> => {
    try {
        const queryParams = new URLSearchParams({
            symbol: request.symbol,
            timespan: request.timespan,
            from: request.from,
            to: request.to,
        });

        const fullUrl = `${apiUrl}?${queryParams.toString()}`;
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        const formattedData: TickerResponse[] = data.map((item: any) => ({
            ...item,
            t: formatDate(item.t),
        }));

        return formattedData;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
