const restrict = () => {
    return async (req, res, next) => {
        try {
            if(!req.session || !req.session.user) {
                return res.status(401).json({
                    message: "Must be logged in !"
                })
            }

            next()
        } catch(err) {
            next(err)
        }
    }

}

module.exports = restrict