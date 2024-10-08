const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const apiController = require('./controllerAPI/api-controller'); //Import API functions

const app = express();
const port = 3434;

//Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

//Routes for Fundraiser API

//1. GET: Get Fundraiser Details by ID (including donations)
app.get('/api/fundraisers/:id', apiController.getFundraiserDetails);

//2. POST: Create a NEW Donation for the a specific fundraiser
app.post('/api/donation', apiController.createDonation);

//3. POST:Create a new fundraiser
app.post('/api/fundraiser', apiController.createFundraiser);

//4. PUT: Update an existing fundraiser by ID
app.put('/api/fundraiser/:id', apiController.updateFundraiser);

//5. DELETE: Delete a fundraiser by ID (Only if no donations)
app.delete('/api/fundraiser/:id', apiController.deleteFundraiser);

//Start the server
app.listen(port, () =>{
    console.log(`API server is running on http://localhost:${port}`);
});