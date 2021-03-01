import createError from 'http-errors'
import { Animal } from '../models/Animal.js'

export class AnimalController {

    async loadAnimal(req, res, next, id) {
        try {
            const animal = Animal.getById(id)

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
            const animals = Animal.getAll()
            res.json(animals)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const animal = await Animal.insert(this.getReqAnimalData(req))

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
            rescuer: req.body.rescuer,
            name: req.body.name,
            position: {
                latitude: req.body.position.latitude,
                longitude: req.body.position.longitude
            },
            facility: req.body.facility,
            city: req.body.city,
            species: req.body.species,
            weight: req.body.weight,
            length: req.body.length,
            image: req.body.image
        }
    }
}