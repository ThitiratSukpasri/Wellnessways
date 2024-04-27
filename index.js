const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const supertest = require('supertest');
const session = require('express-session'); //************add this */
const app = express();
const users = []; // Array to store user data from CSV
//const email=[];
// Middleware to parse the request body
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true })); // Add this line

app.use(express.json());
// Read the CSV file and populate the 'users' array
fs.createReadStream('users.csv')
    .pipe(csv({ headers: false }))
    .on('error', error => {
        console.error(error);
        process.exit(1); // Exit the process in case of an error
    })
    .on('data', row => {
        users.push(row); // Store each row in the 'users' array
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });

app.post('/index', (req, res) => {
    const startTime = performance.now(); // Start profiling
    const email = req.body.email;
    const password = req.body.password;
    
    const user = users.find(u => u[0] === email && u[1] === password);

    if (!user) {
        console.log('Login failed');
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = user; // Add this line

    console.log('Login successful');
    const endTime = performance.now(); // End profiling
    console.log("calculatebmi:", endTime - startTime, "milliseconds");
    return res.status(200).json({ message: 'Login successful' });

    
});


app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).send('Error during login');
});

// Only start the server if the file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

app.use(express.static('public'));

app.post('/myprofile', (req, res) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    res.json({ user: req.session.user }); // Change this line
    const endTime = performance.now();
});

app.get('/index.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/index.js');
});

module.exports = app;
