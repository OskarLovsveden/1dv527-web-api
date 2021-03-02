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

        const user = JSON.parse(JSON.stringify(req.user))

        const data = {
            _links: [
                {
                    rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.id}`
                }
            ],
            _embedded: {
                ...user
            }
        }

        res.json(data)
    }

    async findAll(req, res, next) {
        try {
            const usersDocument = await User.find({})
            const users = JSON.parse(JSON.stringify(usersDocument))

            const data = {
                _links: [
                    {
                        rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                    }
                ],
                _embedded: users.map(u => {
                    return {
                        _links: [
                            {
                                rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${u.id}`
                            }
                        ],
                        ...u
                    }
                })
            }

            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}