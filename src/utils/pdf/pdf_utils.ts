// data-html2canvas-ignore="true" to ignore html element
import jsPDF from "jspdf";

export function genPDF(title: string, x: number, y: number, width: number, windowWidth: number): void {
    const JSPDF = new jsPDF();
    JSPDF.html(document.body, {
        callback: (docPDF) => docPDF.save(`${title}.pdf`),
        x,
        y,
        width,
        windowWidth
    });
}
