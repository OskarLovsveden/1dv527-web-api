import createError from 'http-errors'
import { User } from '../models/User.js'

export class UserController {

    async register(req, res, next) {
        try {
            console.log(req.body)
            const user = await User.insert({
                username: req.body.username,
                password: req.body.password
            })

            res.status(201).json({ id: user.id })

        } catch (error) {
            let err = error

            if (err.code === 11000) {
                // Duplicated keys.
                err = createError(409)
                err.innerException = error
            } else if (error.name === 'ValidationError') {
                // Validation error(s).
                err = createError(400)
                err.innerException = error
            }

            next(err)
        }
    }
}