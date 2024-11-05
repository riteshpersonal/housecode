const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");


// LATEST VERSION Socket io @4.4.1
const { createServer } = require("http");
const httpServer = createServer(app);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });

const connectDb = require("./utilsServer/connectDb");
connectDb();



app.use(express.json());

const PORT = process.env.PORT || 3000;


nextApp.prepare().then(() => {
  app.use("/api/admin", require("./api/admin"));
  app.use("/api/broker", require("./api/broker"));
  app.use("/api/properties", require("./api/properties"));
  app.all("*", (req, res) => handle(req, res));

  httpServer.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running",PORT);
  });
});
