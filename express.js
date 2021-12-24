const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "expres.txt");
const formidable = require("express-formidable");
app.use(formidable());

app.get("/", (req, res) => {
    res.send("hello");
    res.end();
});

app.get("/form", (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write("<form action='/submit' method='POST'><input name='fName' /><input name='lName' /><button>submit</button></form>");
    res.end();
});

app.post("/submit", (req, res) => {
    let data = JSON.stringify( req.fields);
    // req.on("data", (chunk) => {
    //     data += chunk;
    // });
    // req.on("end", () => {
        // fs.readFile(filePath, "utf8", (err, oldData) => {
        //     const newData = oldData + "\n" + data;
            fs.writeFile(filePath, data, () => {
                console.log("file written");
            });
        // });

    // });
    res.write("submitted");
    res.end();
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});