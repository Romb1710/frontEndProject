
import React, { useEffect, useState } from 'react';
//import { saveData } from './localstorage';
import { idb } from './idbForReact';
import {CostItem} from './costitem.js';
import './costsform.css';

// form component that renders the form and the table with the costs
const CostsForm = (props) => {
    // use state for the costs for useEffect rendering and the current cost for the form
    const [currCost, setCurrCost] = useState(new CostItem());
    const [costs, setCosts] = useState([]);

    // function that handles the change of the input fields
    const handleChange = (e, inputname, inputType) => {
        const { value = "" } = e.currentTarget;
        const newcurrCost = new CostItem();
        newcurrCost.copyConstructor(currCost);
        if (inputType === 'select' &&value === "")
        {
            newcurrCost[inputname] = "Other";
        }
        else
        {
        newcurrCost[inputname] = value;
        }
        setCurrCost(newcurrCost);
    };

    
    // function that handles the submit of the form and adds the current cost to the costs array,
    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = await idb.openCostsDB("costsdb", 4);
        console.log('db1:', db); // Add this line
        db.addCost(currCost)
            .then(() => {
            setCosts([...costs, currCost]);
            e.target.reset(); // reset the values in the inputs
            setCurrCost(new CostItem());
             })
            .catch((error) => {
                console.error(error);
            });

        /*
        saveData('costs', currCost)
          .then(() => {
            setCosts([...costs, currCost]);
            e.target.reset(); // reset the values in the inputs
            setCurrCost(new CostItem());
          })
          .catch((error) => {
            console.error(error);
          });

         */
      }

    //function that renders the table after submit with use effect
    useEffect(() => {
        props.setCosts(costs);
    }, [costs]);

    //function that updates the App.js state for the visibility of the form
    useEffect(() => {
        props.setVisible(props.visible);
    }, [props.visible]);

    return (
        // form for the costs
        <div className="formDiv">
            <form className="costsForm" onSubmit={handleSubmit}>
                {props.fields.map((field, index) => {
                    return (
                        <span className="costsFormInputLabel" key={index}>
                            <label className="textDiv">{field.label}</label>
                            {
                                field.type !== 'select' ?
                                <input className="costsFormInput" type={field.type} name={field.name} onChange=
                                {(e) => handleChange(e, field.name,field.type)} required={field.required}/>
                                :
                                <select className="costsFormInput" name={field.name} onChange=
                                {(e) => handleChange(e, field.name,field.type)} required={field.required}>
                                    {field.options.map((option, index) => {
                                        return <option key={index} selected={index===field.options.length-1}>{option}</option>
                                    })}
                                    </select>
                            }  
                            <br />
                        </span>
                    );
                })}
                <button className='formBtn' type="submit">Add</button>
                <button className='formBtn' type="reset">Reset Form</button>
            </form>
            <table className="Table">
                <thead>
                    <tr className='tableHeader'>
                        {props.fields.map((field, index) => { return <th key={index}>{field.label}</th> })}
                    </tr>
                </thead>
                <tbody>
                    {costs?.map((cost, index) => {
                        return (<tr className='tableRow' key={index}>
                            {Object.keys(cost).map((key, index) => {
                                return <td key={index}>{cost[key]}</td>
                            })}
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CostsForm;
