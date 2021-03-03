import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../models/User.js'

export class AccountController {

    async register(req, res, next) {
        try {
            const user = await User.insert({
                username: req.body.username,
                password: req.body.password,
                type: req.body.type || 'user'
            })

            const data = {
                _links: [
                    { rel: 'login', method: 'POST', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/login` }
                ],
                _embedded: { id: user.id }
            }

            res.status(201)
            res.json(data)

        } catch (error) {
            let err = error

            if (err.code === 11000) {
                err = createError(409)
                err.innerException = error
            } else if (error.name === 'ValidationError') {
                err = createError(400)
                err.innerException = error
            }

            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const user = await User.authenticate(req.body.username, req.body.password)

            const payload = {
                username: user.username,
                type: user.type
            }

            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })

            // Create the refresh token with the longer lifespan.

            const data = {
                _links: [
                    { rel: 'api/v1', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}` }
                ],
                _embedded: {
                    access_token: accessToken
                    // refresh_token: refreshToken
                }
            }

            res.status(201)
            res.json(data)
        } catch (error) {
            const err = createError(401)
            err.innerException = error

            next(err)
        }
    }
}
