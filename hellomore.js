var http = require("http");

http
  .createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch (path) {
      case "":
        res.writeHead(200, { "Content-Type": "text/plane" });

        res.end("home page");

        break;

      case "/about":
        res.writeHead(200, { "Content-Type": "text/plane" });
        res.end("About");
        break;

      default:
        res.writeHead(200, { "Content-Type": "text/plane" });
        res.end("deafualt page");
        break;
    }
  })
  .listen(3000);
