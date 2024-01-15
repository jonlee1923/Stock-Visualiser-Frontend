"use client";
import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { AggregateResponse } from "@/types";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAggregateDataQuery } from "@/store/features/api/apiSlice";
import { BarLoader } from "react-spinners";

const Chart = () => {
    const [skip, setSkip] = useState(true);
    const aggregateData: AggregateResponse[] = useSelector(
        (state: RootState) => state.tickerDetails.aggregateData
    );
    const timespan: string = useSelector(
        (state: RootState) => state.tickerDetails.filterTimespan
    );
    const symbol: string = useSelector(
        (state: RootState) => state.tickerDetails.symbol
    );
    const from = "2024-01-02";
    const to = "2024-01-04";
    useEffect(() => {
        if (symbol == "") setSkip(true);
        else setSkip(true);
    }, [symbol]);

    const { data, isLoading } = useGetAggregateDataQuery(
        { symbol, timespan, from, to }
        // { skip }
    );


    return (
        <div className="w-7/8 h-full border-2 border-indigo-500/75 rounded-lg shadow-lg p-10 mx-8">
            <Filter />
            {data == undefined &&
                (
                    <div className="flex justify-center items-center h-full">
                        Search a symbol to get get started!!!
                    </div>
                )
            }
            {
                isLoading && 
                (
                    <div>
                        <BarLoader color="#36d7b7" />
                    </div>
                )
            }
            {data != undefined && (
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="open"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                            <linearGradient
                                id="close"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                        <XAxis dataKey="t" />
                        <YAxis domain={["dataMin", "dataMax"]} />
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
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Chart;
