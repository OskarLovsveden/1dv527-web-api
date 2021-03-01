import createError from 'http-errors'
import { Animal } from '../models/Animal.js'

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
        res.json(req.animal)
    }

    async findAll(req, res, next) {
        try {
            const animalsDocument = await Animal.find({})
            const animals = JSON.parse(JSON.stringify(animalsDocument))

            res.json(animals.map(a => {
                return {
                    ...a,
                    _links: [
                        {
                            rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/${a.id}`
                        }
                    ]
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const animal = await Animal.insert(this.getReqAnimalData(req))

            // Trigger event for webhook
            const event = req.app.get('EventEmitter')
            event.emit('new-animal', animal)

            res.status(201)
            res.json(animal)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            await req.animal.update(this.getReqAnimalData(req))

            res.status(204)
            res.end()
        } catch (error) {
            next(error)
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

    async getReqAnimalData(req) {
        return {
            rescuer: req.user.username,
            name: req.body.name,
            city: req.body.city,
            species: req.body.species
        }
    }
}