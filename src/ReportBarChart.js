import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const ReportBarChart = ({ data }) => {
    // colors for the bar chart
    const barChartColors = ['red', 'yellow', 'orange', 'pink', 'brown', 'grey', 'black'];

    return (
        <BarChart width={400} height={400} data={data} className="barChart">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sum" nameKey="Category">
                {data?.map((entry, index) => (
                    <div>
                    <Bar
                        key={index}
                        dataKey="Sum"
                        data={[entry]}
                        fillColor={barChartColors[index % barChartColors.length]}
                    />
                        {console.log("test" + barChartColors[index % barChartColors.length])}
                    </div>
                ))}
            </Bar>
        </BarChart>
    );
};

export default ReportBarChart;
