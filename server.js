const express = require("express");
const sql = require("mssql");
//const bcrypt = require("bcrypt");
const cors = require("cors");
require('dotenv').config({ path: './backend/.env' });


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // match frontend origin


// SQL Server configuration
var config = {
    "user": "sa", // Database username
    "password": "dockerStrongPwd123", // Database password
    "server": "localhost", // Server IP address
    "database": "userLogin", // Database name
    "options": {
        "encrypt": true, // enable encryption bcs use azure
        "trustServerCertificate": true
    }
}

// Connect to SQL Server
sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

app.post("/user", async (request, response) => {
    console.log("Received body:", request.body); // Log the incoming body

    const { name, email, password } = request.body;

    try {
        const existingUser = await new sql.Request()
            .input("Email", sql.NVarChar(100), email)
            .query(`SELECT * FROM userInfo WHERE email = @Email`);

        if (existingUser.recordset.length > 0) {
            return response.status(400).json({ message: "User already exists" });
        }

        // Insert new user into the database using parameters
        await new sql.Request()
            .input("Name", sql.NVarChar(100), name)
            .input("Email", sql.NVarChar(100), email)
            .input("Password", sql.NVarChar(255), password) // TRY BCRYPT AGAIN LATER
            .query(`INSERT INTO userInfo (name, email, password) VALUES (@Name, @Email, @Password)`);

        response.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.error("Error:", error);
        response.status(500).json({ message: "Server error." });
    }
});
 
app.post('/user/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        // Fetch the user by email, including the password in the query result
        const result = await new sql.Request()
            .input("Email", sql.NVarChar(100), email)
            .query(`SELECT * FROM userInfo WHERE email = @Email`);

        // Check if the user exists
        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Check kalau dia received pass and user correctly
            console.log("User found:", user);
            console.log("Received password:", password);
         
            if (user.Password === password) {
                return response.status(200).json({ message: "Successfully logged in", user });
            } else {
                return response.status(401).json({ error: "Invalid password" });
            }
        } else {
            return response.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        response.status(500).json({ message: "Server login error." });
    }
});

app.post("/application", async (request, response) => {
    console.log("Received body:", request.body);

    const {
        userId,
        name,
        id,
        addressLine1,
        addressLine2,
        addressLine3,
        country,
        state,
        city,
        postcode,
        description,
    } = request.body;

    const transaction = new sql.Transaction();

    try {
        // Begin transaction
        await transaction.begin();

        // Check if the user has already applied for the company
        const existingApplication = await new sql.Request(transaction)
            .input("CompanyID", sql.Int, id)
            .input("UserID", sql.Int, userId)
            .query(`SELECT * FROM userApplication WHERE CompanyID = @CompanyID AND UserID = @UserID`);

        // If the application already exists, respond with an error
        if (existingApplication.recordset.length > 0) {
            return response.status(400).json({ message: "You have already applied for this company." });
        }

        

        // Insert new company into the database if it does not exist
        // You can choose to first check if the company already exists or directly insert as per your application logic
        await new sql.Request(transaction)
            .input("CompanyName", sql.NVarChar(100), name)
            .input("CompanyID", sql.Int, id)
            .input("Address1", sql.NVarChar(50), addressLine1)
            .input("Address2", sql.NVarChar(50), addressLine2)
            .input("Address3", sql.NVarChar(50), addressLine3)
            .input("Country", sql.NVarChar(50), country)
            .input("State", sql.NVarChar(50), state)
            .input("City", sql.NVarChar(50), city)
            .input("Postcode", sql.Int, postcode)
            .input("Description", sql.NVarChar(100), description)
            .query(`INSERT INTO company (CompanyName, CompanyID, Address1, Address2, Address3, Country, State, City, Postcode, Description) 
                    VALUES (@CompanyName, @CompanyID, @Address1, @Address2, @Address3, @Country, @State, @City, @Postcode, @Description)`);

        // Insert new application into the `userApplication` table to link the user with the application
        await new sql.Request(transaction)
            .input("UserID", sql.Int, userId)
            .input("CompanyID", sql.Int, id)
            .query(`INSERT INTO userApplication (UserID, CompanyID) VALUES (@UserID, @CompanyID)`);

        // Commit the transaction if everything is successful
        await transaction.commit();

        response.status(201).json({ message: "Company and application registered successfully." });

    } catch (error) {
        console.error("SQL Error Code:", error.code);
        console.error("SQL Error Message:", error.message);

        // Rollback the transaction in case of an error
        await transaction.rollback();

        response.status(500).json({ message: "Server error." });
    }
});


// app.post("/application", async (request, response) => {
//     console.log("Received body:", request.body); // Log the incoming body

//     const {
//         name,
//         id,
//         addressLine1,
//         addressLine2,
//         addressLine3,
//         country,
//         state,
//         city,
//         postcode,
//         description,
//     } = request.body;

//     try {
//         // Check if the company already exists
//         const existingUser = await new sql.Request()
//             .input("CompanyID", sql.Int, id) // Ensure type consistency
//             .query(`SELECT * FROM company WHERE CompanyID = @CompanyID`);

//         if (existingUser.recordset.length > 0) {
//             return response.status(400).json({ message: "Company already applied." });
//         }

//         // Insert new company into the database using parameters
//         await new sql.Request()
//             .input("CompanyName", sql.NVarChar(100), name)
//             .input("CompanyID", sql.Int, id) //
//             .input("Address1", sql.NVarChar(50), addressLine1)
//             .input("Address2", sql.NVarChar(50), addressLine2)
//             .input("Address3", sql.NVarChar(50), addressLine3)
//             .input("Country", sql.NVarChar(50), country)
//             .input("State", sql.NVarChar(50), state)
//             .input("City", sql.NVarChar(50), city)
//             .input("Postcode", sql.Int, postcode)
//             .input("Description", sql.NVarChar(100), description)
//             .query(`INSERT INTO company (CompanyName, CompanyID, Address1, Address2, Address3, Country, State, City, Postcode, Description) 
//                 VALUES (@CompanyName, @CompanyID, @Address1, @Address2, @Address3, @Country, @State, @City, @Postcode, @Description)`);

//         response.status(201).json({ message: "Company applied successfully." });

//         // await new sql.Request(
//         //     .input()
//         // )
//     } catch (error) {
//         console.error("SQL Error Code:", error.code);
//         console.error("SQL Error Message:", error.message);

//         // More specific error handling
//         if (error.code === 'EREQUEST') {
//             return response.status(400).json({ message: "Invalid request. Please check the input fields." });
//         }

//         response.status(500).json({ message: "Server error." });
//     }
// });

app.get("/user", (request, response) => {
  // Execute a SELECT query
  new sql.Request().query("SELECT * FROM userInfo", (err, result) => {
    if (err) {
        console.error("Error executing query:", err);
    } else {
        response.send(result.recordset); // Send query result as response
        console.dir(result.recordset);
    }
});
})

app.get("/application", (request, response) => {
    // Execute a SELECT query
    new sql.Request().query("SELECT * FROM company", (err, result) => {
      if (err) {
          console.error("Error executing query:", err);
      } else {
          response.send(result.recordset); // Send query result as response
          console.dir(result.recordset);
      }
  });
  })

  //this one dia amik userID (try to check if can tukar endpoint)
  app.get('/application/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    
    try {
        const result = await new sql.Request()
            .input('UserID', sql.Int, userId)
            .query(`
                SELECT c.CompanyName, c.CompanyID, c.Address1, c.Address2, c.Address3, 
                       c.Country, c.State, c.City, c.Postcode, c.Description, c.CreatedDate 
                FROM userApplication ua
                JOIN company c ON ua.CompanyID = c.CompanyID
                WHERE ua.UserID = @UserID
            `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error retrieving applications:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

//yang ni buat dia receive company id from clicked company name. (btulkan frontend dulu?)
app.get('/application/view/:companyId',async(req,res) =>{
    const companyId = parseInt(req.params.companyId);

    try{
        const result = await new sql.Request()
        .input('CompanyID', sql.Int, companyId)
        .query(`SELECT c.CompanyName, c.CompanyID, c.Address1, c.Address2, c.Address3, 
            c.Country, c.State, c.City, c.Postcode, c.Description, c.CreatedDate 
     FROM userApplication ua
     JOIN company c ON ua.CompanyID = c.CompanyID
     WHERE ua.UserID = @UserID`);

     res.status(200).json(result.recordset);
    }catch (error){
        console.error('Error retrieving application:', error);
        res.status(500).json({message: 'Server Error.'});
    }
});

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});
