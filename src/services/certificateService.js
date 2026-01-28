import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Service to handle PDF certificate generation from DOM elements
 */
export const certificateService = {
    /**
     * Generates a PDF from a DOM element
     * @param {string} elementId - The ID of the element to capture
     * @param {string} fileName - The name of the file to save
     */
    async generatePDF(elementId, fileName = 'certificate.pdf') {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID ${elementId} not found`);
            return;
        }

        try {
            // Create a canvas from the element
            // Scale increases quality for high DPI
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');

            // PDF configuration (A4 landscape is usually better for certificates)
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save(fileName);

            return true;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }
};
