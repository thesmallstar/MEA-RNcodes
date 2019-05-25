var http = require("http");
// working with node, without express
http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end("hello world");
  })
  .listen(3000);

console.log("Server started at port 3000");
