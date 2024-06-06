// functions/server.js
const path = require('path');
const fs = require('fs');
const { createServer, proxy } = require('http-proxy-middleware');
const { URL } = require('url');

// Create the server and handle requests
module.exports = async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    
    if (url.pathname === '/menu') {
        const menuPath = path.join(__dirname, '..', 'public', 'menu.json');
        const menuData = fs.readFileSync(menuPath, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.end(menuData);
    } else {
        // Serve static files
        const filePath = path.join(__dirname, '..', 'public', url.pathname);
        if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', getContentType(filePath));
            const fileData = fs.readFileSync(filePath);
            res.end(fileData);
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
};

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.json':
            return 'application/json';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        default:
            return 'text/plain';
    }
}
