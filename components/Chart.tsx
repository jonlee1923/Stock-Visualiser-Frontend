"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAggregateDataQuery } from "@/store/features/api/apiSlice";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
    FilterDateRange,
    setAggData,
} from "@/store/features/historicalData/historicalDataSlice";
import DatePicker from "./DatePicker";

const Chart = () => {
    const [toastId, setToastId] = useState<string | null>(null);
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
    const dateRange: FilterDateRange = useSelector(
        (state: RootState) => state.tickerDetails.filterDateRange
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (symbol == "") setSkip(true);
        else setSkip(true);
    }, [symbol]);

    const { data, isLoading, isSuccess, isError } = useGetAggregateDataQuery(
        { symbol, timespan, from: dateRange.from, to: dateRange.to }
        // { skip }
    );

    useEffect(() => {
        if (!data) return;
        dispatch(setAggData(data));
    }, [data]);

    if (isLoading && toastId === null) {
        setToastId(toast.loading("Loading..."));
        console.log(toastId);
    }
    if (isSuccess && toastId) toast.success("Data fetched :)", { id: toastId });
    else if (isError && toastId) toast.error("Error :(", { id: toastId });

    return (
        <div className="w-7/8 h-full border-2 border-zinc-600 rounded-lg shadow-lg p-10 mx-8">
            <div className="flex justify-between items-center">
                <Filter />
                <DatePicker />
            </div>
            {data == undefined && (
                <div className="flex justify-center items-center h-full">
                    Search a symbol to get get started!!!
                </div>
            )}
            {isLoading && (
                <div>
                    <BarLoader color="#36d7b7" />
                </div>
            )}
            {data != undefined && (
                <ResponsiveContainer>
                    <AreaChart data={aggregateData}>
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
