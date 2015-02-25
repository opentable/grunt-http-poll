var http = require("http"),
    fs = require("fs"),
    count503s = 0;

var server = http.createServer(function(request, response) {

    if(request.url === '/kill'){
        response.end();
        process.exit(0);
    }

    if(request.url === '/503after3attempts'){

      if(count503s < 2){
        response.writeHead(200, { 'Content-Type': 'text/html' });
      }
      else{
        count503s = -1;
        response.writeHead(503, { 'Content-Type': 'text/html' });
      }

      response.end();
      count503s++;
      return;
    }

    response.writeHead(404);
    response.end();
    return;

}).listen(8888);
