import { useState } from "react";
import AddRequirment from "./AddRequirment";
import { v4 as uuidv4 } from "uuid";
import { jsPDF } from "jspdf"; // Import jsPDF
import "./form.css";

export default function Form() {
    
    const [formData, setFormData] = useState({
        clientName: "",
        clientPhone: "",
        clientMail: "",
        clientAddress: "",
        projectName: "",
        description: "",
    });

    const [fields, setFields] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const addField = () => {
        setFields([
            ...fields,
            { id: uuidv4(), title: "", costTime: 0, costMoney: 0 },
        ]);
    };

    const removeField = () => {
        
    }
    const handleFieldChange = (id, updatedField) => {
        setFields(fields.map((field) => (field.id === id ? updatedField : field)));
    };

    const validateForm = () => {
        if (!formData.clientName || !formData.clientPhone || !formData.clientMail) {
            alert("Please fill out all required fields.");
            return false;
        }
        return true;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString();
    
        doc.setFillColor(64, 168, 50);
        doc.rect(0, 0, 1000, 35, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(32);
        doc.setTextColor('#FFFFFF');
        doc.text(`${formData.projectName.toUpperCase()}`, 20, 25);
        doc.setFontSize(14);
        doc.text("Date", 150, 25);
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(`${currentDate}`, 170, 25);
    
        doc.setTextColor(64, 168, 50);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Customer Information", 20, 60);
        doc.setLineWidth(1);
        doc.setDrawColor(64, 168, 50);
        doc.line(20, 65, 100, 65);
    
        // Customer Information
        const customerDetails = [
            { label: "Customer Name", value: formData.clientName },
            { label: "Customer Phone", value: formData.clientPhone },
            { label: "Email", value: formData.clientMail },
            { label: "Address", value: formData.clientAddress },
        ];
        let yOffset = 80;
        customerDetails.forEach(detail => {
            doc.setFontSize(14);
            doc.setTextColor('#000000');
            doc.setFont("helvetica", "bold");
            doc.text(detail.label, 20, yOffset);
    
            doc.setTextColor('#808080');
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`${detail.value}`, 100, yOffset);
    
            yOffset += 10;
        });
    
        // Job Information Header
        yOffset += 15;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(64, 168, 50);
        doc.text("Job Information", 20, yOffset);
    
        doc.setLineWidth(1);
        doc.setDrawColor(64, 168, 50);
        doc.line(20, yOffset + 5, 100, yOffset + 5);
    
        // Table Header
        yOffset += 15;
        doc.setTextColor("#000000");
        doc.setFontSize(10);
        doc.setFillColor(225, 239, 220);
        doc.roundedRect(80, yOffset, 50, 6, 1, 1, "F");
        doc.text("Estimated Cost ($)", 90, yOffset + 4);
    
        doc.setFillColor(225, 239, 220);
        doc.roundedRect(135, yOffset, 50, 6, 1, 1, "F");
        doc.text("Estimated Time (in hours)", 139, yOffset + 4);
    
        // Writing the requirements
        let totalCostMoney = 0;
        yOffset += 15;
        const maxY = 275;
    
        fields.forEach((field) => {
            if (yOffset + 10 > maxY) {
                doc.addPage();
                yOffset = 20;

                doc.setTextColor("#000000");
                doc.setFontSize(10);
                doc.setFillColor(225, 239, 220);
                doc.roundedRect(80, yOffset, 50, 6, 1, 1, "F");
                doc.text("Estimated Cost ($)", 90, yOffset + 4);
    
                doc.setFillColor(225, 239, 220);
                doc.roundedRect(135, yOffset, 50, 6, 1, 1, "F");
                doc.text("Estimated Time (in hours)", 139, yOffset + 4);
    
                yOffset += 15;
            }
    
            doc.setTextColor("#000000");
            doc.setFillColor(225, 239, 220);
            doc.roundedRect(25, yOffset - 4, 50, 6, 1, 1, "F");
            doc.text(`${field.title}`, 28, yOffset);
    
            doc.setTextColor("#808080");
            doc.setFillColor(247, 251, 246);
            doc.roundedRect(80, yOffset - 4, 50, 6, 1, 1, "F");
            doc.text(`${field.costMoney}`, 100, yOffset);
    
            doc.setFillColor(247, 251, 246);
            doc.roundedRect(135, yOffset - 4, 50, 6, 1, 1, "F");
            doc.text(`${field.costTime}`, 155, yOffset);
    
            totalCostMoney += parseInt(field.costMoney, 10);
            yOffset += 10;
        });
    
        // Total Cost
        doc.setLineWidth(1);
        doc.setDrawColor(64, 168, 50);
        doc.line(110, yOffset, 200, yOffset);
    
        doc.setFillColor(64, 168, 50);
        doc.rect(130, yOffset + 5, 70, 15, "F");
        doc.setTextColor("#FFFFFF");
        doc.setFontSize(12);
        doc.text(`Total Estimated Cost`, 140, yOffset + 15);
        doc.setFont("helvetica", "normal");
        doc.text(`$${totalCostMoney}`, 185, yOffset + 15);
    
        doc.save(`${formData.clientName}.pdf`);
    };
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            generatePDF(); // Generate PDF when the form is valid
        }
    };

    const inputs = [
        { id: "clientName", type: "text", placeholder: "Name", required: true },
        { id: "clientPhone", type: "number", placeholder: "Phone Number", required: true },
        { id: "clientMail", type: "email", placeholder: "E-mail", required: true },
        { id: "clientAddress", type: "text", placeholder: "Address", required: true },
        { id: "projectName", type: "text", placeholder: "Project Name", required: true },
        { id: "description", type: "text", placeholder: "Description", required: true },
    ];

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-group-container">
                    {inputs.map((input) => (
                        <div key={input.id} className="input-group">
                            <label htmlFor={input.id}>
                                {input.placeholder} {input.required && <span style={{ color: "red" }}>*</span>}
                            </label>
                            <input
                                id={input.id}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={formData[input.id]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>

                <div className="requirment-container">
                    {fields.map((field) => (
                        <AddRequirment
                            key={field.id}
                            field={field}
                            onFieldChange={handleFieldChange}
                        />
                    ))}
                </div>

                <button className="add-btn" type="button" onClick={addField}>
                    Add another requirement
                </button>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    );
}
