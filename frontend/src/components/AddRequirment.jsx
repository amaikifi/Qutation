// AddRequirment.js
import React from "react";
import "./addRequirment.css";

export default function AddRequirment({ field, onFieldChange }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        onFieldChange(field.id, { ...field, [id]: value });
    };

    return (
        <div className="add-requirment" key={field.id}>
            
            <label htmlFor="title">Requirement</label>
            <input
                type="text"
                id="title"
                placeholder="Requirement"
                value={field.title}
                onChange={handleChange}
            />

            <label htmlFor="costTime">Cost (Time)</label>
            <input
                type="number"
                id="costTime"
                placeholder="Cost time"
                value={field.costTime}
                onChange={handleChange}
            />

            <label htmlFor="costMoney">Cost (Money)</label>
            <input
                type="number"
                id="costMoney"
                placeholder="Cost money"
                value={field.costMoney}
                onChange={handleChange}
            />
        </div>
    );
}
