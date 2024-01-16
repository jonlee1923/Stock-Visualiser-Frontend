import { AggregateResponse } from "@/types";

export const formatDateString = (timestamp: string) => {
    let date = new Date(parseInt(timestamp)).toISOString().split("T")[0]
    return date;
};

export const formatDateToString = (date: Date) =>{
    return date.toISOString().split("T")[0]
}

export const StringToDateAggData = (data: AggregateResponse[]) => {
    const formattedData = data.map((item) => ({
        ...item,
        t: formatDateString(item.t), // Format the date as a string (date portion only)
    }));
    return formattedData;
};
