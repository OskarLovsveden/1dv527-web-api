import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { AnimalController } from '../../../controller/animal-controller.js'

export const router = express.Router()

const controller = new AnimalController()

const authenticateJWT = (req, res, next) => {
    const authorization = req.headers.authorization?.split(' ')

    if (authorization?.[0] !== 'Bearer') {
        next(createError(401))
        return
    }

    try {
        const payload = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET)

        req.user = {
            username: payload.username
        }

        next()
    } catch (err) {
        next(createError(403))
    }
}

router.param('id', (req, res, next, id) => controller.loadAnimal(req, res, next, id))

// GET animals
router.get('/', authenticateJWT, (req, res, next) => controller.findAll(req, res, next))

// GET animals/:id
router.get('/:id', authenticateJWT, (req, res, next) => controller.find(req, res, next))

// POST animals
router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))

// PUT animals/:id
router.put('/:id', authenticateJWT, (req, res, next) => controller.update(req, res, next))

// DELETE animals/:id
router.delete('/:id', authenticateJWT, (req, res, next) => controller.delete(req, res, next))
