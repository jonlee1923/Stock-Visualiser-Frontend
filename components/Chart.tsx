"use client";
import React, { PureComponent, ReactNode } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { getAggregateData } from "@/services/StockService";
import { AggregateResponse } from "@/types";

const Chart = () => {
    const [aggregateData, setAggregateData] = useState<AggregateResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const symbol = "AAPL";
    const timespan = "DAY";
    const from = "2024-01-02";
    const to = "2024-01-04";

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getAggregateData({
                symbol,
                timespan,
                from,
                to,
            });
            setAggregateData(response);
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
        <div className="w-7/8 h-full border-black text-cyan-500">
            <ResponsiveContainer >
                <AreaChart
                    data={aggregateData}
                    // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    <XAxis
                        dataKey="t"
                    />
                    <YAxis
                        domain={["dataMin", "dataMax"]}
                    />
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
                    <Legend/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
