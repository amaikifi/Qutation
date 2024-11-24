import { jsPDF } from "jspdf"

export default function PDFGenerator() {
    
    const generatePDF = (() => {
        const doc = new jsPDF()

        doc.setFontSize(22)
        doc.text("Hello world", 10, 10)

        doc.setFontSize(19)
        doc.text("this is another text", 10, 50)

        doc.save("test.pdf")
    })
    return (
        <div className="pdf">
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    )
}