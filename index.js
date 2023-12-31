// fs stands for file system
const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////
/* FILES

// Blocking, synchronous way
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);
// const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("File written");

// Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error💥");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File has been written 🙂");
      });
    });
  });
});

console.log("Will ReadFile");
*/

/////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// JSON.parse() will take in json and convert it to a JS Object
const dataObject = JSON.parse(data);

// server and routes
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the Overview page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
  //   console.log(req);
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server started on port 5000");
});
