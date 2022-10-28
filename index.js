var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((request, response) => {
    var query = url.parse(request.url);
    var fileName = '.' + query.pathname;
    if(fileName === './') {
        fileName = './index';
    }
    fileName += '.html';

    fs.readFile(fileName, (err, data) => {
        if(err) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            return response.end("404 not found");
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    })

    // Respond with the url requested
    // response.write(request.url);
    // localhost:8080/summer, will respond "/summer"

    // Respond with the query
    // var query = url.parse(request.url, true).query;
    // var txt = query.year + " " + query.month;
    // response.write(txt);
    // So http://localhost:8080/?year=2017&month=July, will respone w/ "2017 July"

    // response.end();
}).listen(8080);