const express=require("express");
const bodyParser=require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(__dirname, ));

// Define the routes for the web pages
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get("/fundraiser", (req, res) => {
    res.sendFile(__dirname, 'fundraiser.html');
});

app.get("/donation", (req, res) => {
    res.sendFile(__dirname,'donation.html');
});

// Start the web server
app.listen(2016, () => {
    console.log(`Web app server is running at http://localhost:${port}`);
});