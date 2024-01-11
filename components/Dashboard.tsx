import React from "react";
import Chart from "./Chart";
import Details from "./Details";
import Overview from "./Overview";

const Dashboard = () => {
    return (
        <div className="h-screen grid grid-cols-3 grid-rows-5 auto-rows-fr">
            <div className="col-span-2 row-span-4">
                <Chart />
            </div>
            <div><Overview/></div>
            <div className="row-span-3"><Details/></div>
        </div>
    );
};

export default Dashboard;
