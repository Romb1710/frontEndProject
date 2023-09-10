import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ReportBarChart = ({ data }) => {
    console.log("Data in ReportBarChart:", data);


    return (
        <BarChart width={400} height={400} data={data} className="barChart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Category" />
            <YAxis />
            <Tooltip />
            <Legend fill = "green" />
            <Bar dataKey="Sum" nameKey="Category" stroke="#000000">
            </Bar>
        </BarChart>
    );
};

export default ReportBarChart;
/*
   {data?.map((entry, index) => (
                    <div>
                        <Bar
                            key={index}
                            dataKey="Sum"
                            data={[entry]}
                            fill="#00a0fc"
                            stroke="#00a0fc"
                            //fill={barChartColors[index % barChartColors.length]}
                        />
                    </div>
                ))}
*/