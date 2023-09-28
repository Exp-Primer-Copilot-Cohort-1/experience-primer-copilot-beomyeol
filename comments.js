// Create web server
// 1. Include http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

// 2. Create server
http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        // 3.1 Read html file
        var fileContent = fs.readFileSync('views/index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileContent);
    } else if (pathname == '/add') {
        // 3.2 Read html file
        var fileContent = fs.readFileSync('views/add.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fileContent);
    } else if (pathname == '/doadd') {
        var comment = urlObj.query;
        comment.ip = req.connection.remoteAddress;
        comment.time = new Date();
        comments.push(comment);
        // 3.3 Redirect
        res.statusCode = 302;
        res.statusMessage = 'Found';
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname == '/ajax') {
        // 3.4 Return json data
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(comments));
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
    }
}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080');