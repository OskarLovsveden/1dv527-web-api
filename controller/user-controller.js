// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

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

            req.userData = user

            next()
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        const user = JSON.parse(JSON.stringify(req.userData))

        const data = {
            _links: {
                self: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                delete: { method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
            },
            _embedded: { ...user }
        }

        res.json(data)
    }

    async findAll(req, res, next) {
        try {
            const usersDocument = await User.find({})
            const users = JSON.parse(JSON.stringify(usersDocument))

            const data = {
                _links: { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                _embedded: {
                    users: users.map(u => {
                        return {
                            _links: {
                                self: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${u.id}` },
                                delete: { method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${u.id}` }
                            },
                            ...u
                        }
                    })
                }
            }

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await req.userData.delete()

            res.status(204)
            res.end()
        } catch (error) {
            next(error)
        }
    }
}