const { parentPort, workerData } = require('worker_threads');
const XLSX = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path'); 
const userServices = require('../services/userService');

async function processFile() {
    try {

        const filePath = workerData;
        console.log('File path:', filePath);

        const fileExtension = path.extname(filePath).toLowerCase();
        console.log('File extension:', fileExtension);

        const allowedExtensions = ['.csv', '.xlsx'];
        if (!allowedExtensions.includes(fileExtension)) {
            parentPort.postMessage('Unsupported file format');
            return;
        }

        let data = [];
        if (fileExtension === '.xlsx') {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log('XLSX file processed successfully');
            parentPort.postMessage('XLSX file Inserted in background');
            await processData(data);
            parentPort.postMessage('XLSX file processed successfully');
        } else if (fileExtension === '.csv') {
            console.log('Processing CSV file...');
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    data.push(row);
                })
                .on('end', async () => {
                    console.log('CSV file processed successfully');
                    parentPort.postMessage('CSV file Inserted in background');
                    await processData(data);
                    parentPort.postMessage('CSV file processed successfully');
                })
                .on('error', (error) => {
                    console.error(`Error processing CSV: ${error.message}`);
                    parentPort.postMessage(`Error processing CSV: ${error.message}`);
                });
        }
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
        parentPort.postMessage(`Error processing file: ${error.message}`);
    }
}

processFile();

async function processData(data) {
    try {
        var d  = await userServices.csvProcessData(data);
        console.log('Data processing completed');
    } catch (error) {
        console.error(`Error in data processing: ${error.message}`);
        parentPort.postMessage(`Error in data processing: ${error.message}`);
    }
}
