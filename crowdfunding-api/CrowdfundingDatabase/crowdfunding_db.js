const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crowdfunding_db"
});

async function executeQueries() {
  try {
    await connection.execute("Select * FROM category");
    const categoryResult = await connection.execute("Select * FROM category");
    console.log("category:", categoryResult);

    const fundraiserResult = await connection.execute("Select * FROM fundraiser");
    console.log("fundraiser:", fundraiserResult);

    const donationResult = await connection.execute("Select * FROM donation");
    console.log("donation:", donationResult);

    await connection.end();
    console.log("Connection to database successfully closed");
  } catch (err) {
    console.error("Error executing queries:", err.stack);
  }
}

executeQueries();