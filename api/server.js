const express = require("express");

const server = express()

const actionRouter = require("../router/actionRouter");

const projectRouter = require("../router/projectRouter");


server.use(express.json());
server.use(logger);
//Routers

server.use("api/actions", actionRouter);

server.use("api/projects", projectRouter);

//start page

server.get("/", (req, res) => {
    res.send(`<h2>Slam this Sprint!</h2>`);
});

function logger (req, res, next) {

    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`);
    next();

}
module.exports = server;