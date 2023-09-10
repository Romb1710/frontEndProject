
import ReportBarChart from './ReportBarChart';
import { useEffect, useState } from 'react';
import './report.css';

// component that displays the report
const Report = (props) => {
    //console.log("displayedCosts in Report:", props.displayedCosts);
    // colors for the bar chart
    const barChartColors = ['red', 'yellow', 'orange', 'pink', 'brown', 'grey', 'black'];

    // function that formats the data for the bar chart
    const formatDataForGraph = (displayedCosts) => {
        let categoryCount = {};
        displayedCosts?.forEach((cost) => {
            if (cost.Category in categoryCount)
                categoryCount[cost.Category] += Number(cost.Sum);
            else
                categoryCount[cost.Category] = Number(cost.Sum);
        });
        let formattedData = []
        let index = 0;
        Object.keys(categoryCount)?.forEach((category) => {
            if (category === undefined || category === null || category === '')
                category = 'Other';

            formattedData.push({ Category: category, Sum: categoryCount[category], fill: barChartColors[index % barChartColors.length] });
            index +=1;
        });

        return formattedData;
    }

    //const barChartColors = ['red', 'yellow', 'orange', 'pink', 'brown', 'grey', 'black'];

    const [data, setData] = useState(); // data for the Bar chart (category and sum)

    // update the data for the bar chart when the displayed costs change
    useEffect(() => { setData(formatDataForGraph(props.displayedCosts)); }, [props.displayedCosts]);

    return (
        <div className="reportDiv">
            <div className='graphAndTableContainer'>
                <table className="Table" >
                    <thead >
                    <tr className='tableHeader'>
                        {props.fields.map((field, index) => { return <th key={index}>{field.label}</th> })}
                    </tr>
                    </thead>
                    <tbody>
                    {props.displayedCosts?.map((cost, index) => {
                        return (
                            <tr className='tableRow' key={index}>
                                <td key='Category{index}'>{cost.Category}</td>
                                <td key='Quantity{index}'>{cost.Quantity}</td>
                                <td key='Description{index}'>{cost.Description}</td>
                                <td key='Sum{index}'>{cost.Sum}</td>
                                <td key='Date{index}'>{cost.Date}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className='graphDiv'>
                    <ReportBarChart data={data} />
                </div>
            </div>
        </div>
    );
};

export default Report;