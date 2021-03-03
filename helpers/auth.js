// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

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
            username: payload.username,
            type: payload.type
        }

        next()
    } catch (err) {
        next(createError(403))
    }
}