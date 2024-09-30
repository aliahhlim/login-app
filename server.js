const express = require("express");
const sql = require("mssql");
//const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' })); // match frontend origin


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

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});
