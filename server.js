const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get menu data
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.json'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
