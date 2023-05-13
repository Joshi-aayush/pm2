const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is completly blocked
  }
}
app.get("/", (req, res) => {
  // JSON.stringify({})
  // JSON.parse("{}") => {}
  //   [2, 3, 4, 5, 6, 7, 8].sort();
  res.send(`Performance example ${process.pid}`);
  res.send("Ding Ding Ding!");
});

app.get("/timer", (req, res) => {
  res.send("Performance example");
  //delay the response
  res.send(`Beep Beep Beep ${process.pid}`);
  delay(9000);
});

console.log("running server.js");
if (cluster.isMaster) {
  console.log("Master has been started...");
  const NUM_WORKER = os.cpus().length;
  for (let i = 0; i < NUM_WORKER; i++) {
    cluster.fork();
  }
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker process started");
}

app.listen(9000);
