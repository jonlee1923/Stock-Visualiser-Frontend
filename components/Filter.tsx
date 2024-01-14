'use client'
import { ChartFilter } from "@/constants";
import React from "react";
import FilterButton from "./FilterButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFilter } from "@/store/features/historicalData/historicalDataSlice";

const Filter = () => {
    const filter: string = useSelector((state: RootState) => state.tickerDetails.filterTimespan)
    const dispatch = useDispatch();
    const objectMapper = {
        "YEAR": "Y",
        "MONTH": "M",
        "WEEK": "W",
        "HOUR": "H",
        "DAY": "D"
    }

    const onFilterButtonClick = (filter: string) => {
        dispatch(setFilter(filter));
    }
    
    return (
        <div>
            <ul className="flex z-40">
                {Object.entries(objectMapper).map(([key,value]) => (
                    <li key={key}>
                        <FilterButton
                            filter={key}
                            text={value}
                            active={filter.toString() === key}
                            onClick={onFilterButtonClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
