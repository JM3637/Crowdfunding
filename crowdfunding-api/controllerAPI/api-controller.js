//import fundwavedatabase configuration
const db = require('../fundwavedb');

//1. GET: Retrieve Fundraiser Details by ID (with Donations)
const getFundraiserDetails = (req, res) => {
    const fundraiserId = req.params.ids;

    //Query to get fundraiser details
    const fundraiserQuery = `SELECT FROM fundraiser WHERE FUNDRAISER_ID = ?`;
    const donationsQuery = `SELECT FROM donation WHERE FUNDRAISER_ID = ?`;
    db.query(fundraiserQuery, [fundraiserId], (err, fundraiserResults) => {
        if (err) return res.status(500).json({ error: err.message});
        if (fundraiserResults.lenght === 0) {
            return res.status(404).json({ message: "Fundraiser not found"});
        }

        //Query to get donations for the fundraiser
        db.query(donationsQuery, [fundraiserId], (err, donationResults) => {
            if (err) return res.status(500).json({ error: err.message });

            //Return fundraiser details along with donations
            res.json ({
                fundraiser: fundraiserResults[0],
                donations: donationResults
            });
        });
    });
};

//2. POST: Insert a NEW Donation for a specific Fundraiser
const createDonation = (req, res) => {
    const { giver, amount, fundraiserId } = req.body;

    //Check if donation is less than 5 AUD
    if (amount < 5) {
        return res.status(400).json({ message: "Minimum donation is 5 AUD"});
    }

    //Insert donation into the database
    const donationQuery = `INSERT INTO donation (GIVER, AMOUNT, FUNDRAISER_ID) VALUES (?, ?, ?)`;
    db.query(donationQuery, [giver, amount, fundraiserId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ meesage: "Donation created successfully", donationId: result.insertId});
    });
};

//3. POST: Insert a NEW Fundraiser
const createFundraiser = (req, res) => {
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;

    //Insert NEW Fundraiser into the database
    const fundraiserQuery = `INSERT INTO fundraiser (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(fundraiserQuery, [organizer, caption, targetFunding, currentFunding, city, active, categoryId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ meesage: "Fundraiser created successfully", fundraiserId: result.insertId});
    });
};

//4. PUT: Update an Existing Fundraiser by ID
const updateFundraiser = (req, res) => {
    const fundraiserId = req. params.id;
    const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body;

    //Update fundraiser information
    const updateQuery = `UPDATE fundraiser SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?`;

    db.query(updateQuery, [organizer, caption, targetFunding, currentFunding, city, active, categoryId, fundraiserId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Fundraiser not found"});

            res.json({ message: "Fundraiser UPDATED successfully"});
    });
};

//5. DELETE: Delete a Fundraiser by ID (only if No Donations)
const deleteFundraiser = (req, res) => {
    const fundraiserId = req.params.id;

    //Check if the fundraiser has any donations
    const checkDonationsQuery = `SELECT * FROM donation WHERE FUNDRAISER_ID = ?`;
    db.query(checkDonationsQuery, [fundraiserId], (err, donations) => {
        if (err) return res.status(500).json({ error: err.message });

        if (donations.lenght > 0) {
            return res.status(400).json({ message: "Cannot delete fundraiser with existing donations"});
        }

        //If no donations, proceed to delete the fundraiser
        const deleteFundraiserQuery = `DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?`;
        db.query(deleteFundraiserQuery, [fundraiserId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message});
            if (result.affectedRows === 0) return res.status(404).json({ message: "Fundraiser not found"});

            res.json({ message: "Fundraiser deleted successfully"});
        });
    });
};

//Export all the API methods
module.exports = {
    getFundraiserDetails,
    createDonation,
    createFundraiser,
    updateFundraiser,
    deleteFundraiser
};