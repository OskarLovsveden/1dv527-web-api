import createError from 'http-errors'
import { Animal } from '../models/Animal.js'
import { sendToWebhookSubscribers } from '../utils/webhook.js'

export class AnimalController {

    async loadAnimal(req, res, next, id) {
        try {
            const animal = await Animal.getById(id)

            if (!animal) {
                next(createError(404))
                return
            }

            req.animal = animal
            next()
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        const animal = JSON.parse(JSON.stringify(req.animal))

        const data = {
            _links: [
                { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                { rel: 'update', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
            ],
            _embedded: {
                ...animal
            }
        }

        res.json(data)
    }

    async findAll(req, res, next) {
        try {
            const animalsDocument = await Animal.find({})
            const animals = JSON.parse(JSON.stringify(animalsDocument))

            const data = {
                _links: [
                    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    { rel: 'create', method: 'POST', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` }
                ],
                _embedded: animals.map(a => {
                    return {
                        _links: [
                            { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${a.id}` }
                        ],
                        ...a
                    }
                })
            }

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const animal = await Animal.insert({
                rescuer: req.user.username,
                name: req.body.name,
                city: req.body.city,
                species: req.body.species
            })

            // Send animal to webhook subscribers
            sendToWebhookSubscribers(animal)

            res.status(201)
            res.json({
                _links: [
                    { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${animal.id}` },
                    { rel: 'update', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${animal.id}` },
                    { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${animal.id}` }
                ],
                _embedded: { ...JSON.parse(JSON.stringify(animal)) }
            })
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

    async update(req, res, next) {
        try {
            await req.animal.update({
                rescuer: req.user.username,
                name: req.body.name,
                city: req.body.city,
                species: req.body.species
            })

            res.status(204)
            res.end()
        } catch (error) {
            let err = error

            if (error.name === 'ValidationError') {
                err = createError(400)
                err.innerException = error
            }

            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            await req.animal.delete()

            res.status(204)
            res.end()
        } catch (error) {
            next(error)
        }
    }
}