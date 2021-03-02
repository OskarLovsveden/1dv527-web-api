import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export const authenticateJWT = (req, res, next) => {
    const authorization = req.headers.authorization?.split(' ')

    if (authorization?.[0] !== 'Bearer') {
        next(createError(401))
        return
    }

    try {
        const payload = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET)

        req.user = {
            username: payload.username
        }

        next()
    } catch (err) {
        next(createError(403))
    }
}