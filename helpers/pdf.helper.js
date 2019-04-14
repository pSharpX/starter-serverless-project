const path = require('path');
const pdfMakePrinter = require('pdfmake/src/printer');

const public_dirname = path.resolve(__dirname, "../public/");
const fontDescriptors = {
    Roboto: {
        normal: path.join(public_dirname, '/fonts/Roboto/Roboto-Regular.ttf'),
        bold: path.join(public_dirname, '/fonts/Roboto/Roboto-Medium.ttf'),
        italics: path.join(public_dirname, '/fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(public_dirname, '/fonts/Roboto/Roboto-MediumItalic.ttf')
    }
};

module.exports = {
    generatePdfBase64: (docDefinition, callback) => {
        try {
            const printer = new pdfMakePrinter(fontDescriptors);
            const doc = printer.createPdfKitDocument(docDefinition);

            let chunks = [];

            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                const result = Buffer.concat(chunks);
                callback('data:application/pdf;base64,' + result.toString('base64'));
            });

            doc.end();
        } catch (err) {
            throw (err);
        }
    },
    generatePdf: (docDefinition, callback, errorCallback) => {
        try {
            const printer = new pdfMakePrinter(fontDescriptors);
            const doc = printer.createPdfKitDocument(docDefinition);

            let chunks = [];

            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                callback(Buffer.concat(chunks));
            });

            doc.end();
        } catch (err) {
            errorCallback(err);
        }
    }
};