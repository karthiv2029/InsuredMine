const userServices = require("../services/userService");
const returnJsonResponse = require("../utils/helper").returnJsonResponse;
const { Worker } = require('worker_threads');
const path = require('path');


module.exports.uploadCSVFile = async function (req, res, next) {
    try {
        const workerPath = path.resolve(__dirname, '../utils/csvWorker.js');
        const worker = new Worker(workerPath, {
            workerData: req.file.path
        });

        worker.on('message', (message) => {
            res.status(200).json(returnJsonResponse(message,200));            
        });

        worker.on('error', (error) => {
            console.error('Worker error:', error);
            res.status(500).send(`Worker error: ${error.message}`);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
                res.status(500).send('Worker process terminated unexpectedly');
            }
        });

    } catch (err) {
        console.error('Error exporting CSV file:', err);
        res.status(500).send({ error: 'Error exporting CSV file' });
    }
};
