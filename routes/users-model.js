const bcrypt = require("bcryptjs");
const db = require("../config");
const restrict = require("./users-middleware");

const getUsers = async () => {
    const users = await db("users")
        .select("*")

    return users
}

const findByUsername = async (username) => {

    const [foundUser] = await db("users as u")
        .select("u.username", "u.password")
        .where("u.username", username)

    return foundUser
}

const findUser = async (id) => {

    const foundUser = await db("users")
        .select("users.id", "users.username")
        .where("users.id", id)
        .first()

    // console.log(foundUser)

    return foundUser        
}

const addUser = async (newUser) => {
    const { username, password } = newUser;

    
    
    try {
        const findUsername = await findByUsername(username)
        // console.log(findUsername)
        if(findUsername) {
            const errMessage = {
                message: "this username is taken ! "
            }
            return errMessage
        }
        
        const [id] = await db("users")
            .insert({username: username, password: await bcrypt.hash(password, 6)})

        const newUser = await findUser(id)
        
        return newUser
        
    } catch(err) {
        return console.log(err)
    }
    
}

module.exports = {
    getUsers,
    addUser,
    findByUsername,
}