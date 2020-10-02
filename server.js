const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const usersRouter = require("./routes/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.json({
        message: "Server up and running ! "
    })
});

server.use("/users", usersRouter);

module.exports = server