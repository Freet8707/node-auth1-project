const bcrypt = require("bcryptjs");
const db = require("../config");

const getUsers = async () => {
    const users = await db("users")
        .select("*")

    return users
}

const addUser = async (newUser) => {
    const { username, password } = newUser;
    
    try {
        const id = await db("users")
            .insert({username: username, password: await bcrypt.hash(password, 6)})

        return id
        
    } catch(err) {
        next(err)
    }
    
}

module.exports = {
    getUsers,
    addUser,
}