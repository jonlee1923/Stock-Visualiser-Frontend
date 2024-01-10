"use client";
import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { getTickerData } from "@/services/StockService";
import { TickerResponse } from "@/types";
const Chart = () => {
    const [tickerData, setTickerData] = useState<TickerResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const symbol = "AAPL";
    const timespan = "DAY";
    const from = "2024-01-02";
    const to = "2024-01-04";

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getTickerData({
                symbol,
                timespan,
                from,
                to,
            });
            setTickerData(response);
        } catch (error) {
            setError(`Error fetching data: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full border-black">
            <AreaChart
                width={730}
                height={250}
                data={tickerData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="open" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#65D686"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#65D686"
                            stopOpacity={0}
                        />
                    </linearGradient>
                    <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#FA846F"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#FA846F"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="t" domain={["datamin", "datamax"]} />
                <YAxis domain={["auto", "auto"]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="o"
                    stroke="#23C552"
                    fillOpacity={1}
                    fill="url(#open)"
                />
                <Area
                    type="monotone"
                    dataKey="c"
                    stroke="#F84F31"
                    fillOpacity={1}
                    fill="url(#close)"
                />
            </AreaChart>
        </div>
    );
};

export default Chart;
