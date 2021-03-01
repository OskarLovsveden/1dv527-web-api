import createError from 'http-errors'
import { User } from '../models/User.js'

export class UserController {
    async loadUser(req, res, next, id) {
        try {
            const user = await User.getById(id)

            if (!user) {
                next(createError(404))
                return
            }

            req.user = user

            next()
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        res.json(req.user)
    }

}