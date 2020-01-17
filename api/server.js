const express = require("express");



const helmet = require("helmet");

const server = express()

const actionRouter = require("../router/actionRouter");

const projectRouter = require("../router/projectRouter");

server.use(helmet());
server.use(express.json());
server.use(logger);
//Routers

server.use("/actions", actionRouter);

server.use("/projects", projectRouter);

//start page

server.get("/", (req, res) => {
    res.send(`<h2>Slam this Sprint!</h2>`);
});

function logger (req, res, next) {

    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`);
    next();

}
module.exports = server;