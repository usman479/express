const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "mytext.txt");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("hello");
        res.write("world");
        res.end();
    } else if (req.url === "/form") {
        res.setHeader("Content-Type", "text/html")
        res.write("<form action='/submit' method='POST'><input name='fName' /><input name='lName' /><button>submit</button></form>");
        res.end();
    } else if (req.url === "/submit") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            fs.readFile(filePath, "utf8",(err, oldData) => {
                const newData = oldData + "\n" + data;
                fs.writeFile(filePath, newData, () => {
                console.log("file written");
            });
            });
            
        });
        res.write("submitted");
        res.end();
    }

});

server.listen(5000);