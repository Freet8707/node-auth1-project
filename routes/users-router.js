const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "This will be where users data can be retrieved"
    })
});

module.exports = router;