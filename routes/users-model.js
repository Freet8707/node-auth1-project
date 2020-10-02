// const bcrypt = require("bcryptjs");
const db = require("../config");

const getUsers = async () => {
    const users = await db("users")
        .select("*")

    return users
}

module.exports = {
    getUsers,
}