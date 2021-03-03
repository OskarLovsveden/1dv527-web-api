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

            res.status(201).json({ id: user.id })

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

            // Create the access token with the shorter lifespan.
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })

            // // Create the refresh token with the longer lifespan.
            // -----------------------------------------------------------------
            // 👉👉👉 This is the place to create and handle the refresh token!
            //         Quite a lot of additional implementation is required!!!
            // -----------------------------------------------------------------
            // const refreshToken = ...

            res.status(201)
            res.json({
                access_token: accessToken
                // refresh_token: refreshToken
            })
        } catch (error) {
            const err = createError(401)
            err.innerException = error

            next(err)
        }
    }
}
