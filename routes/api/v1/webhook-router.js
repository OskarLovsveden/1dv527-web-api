import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { WebhookController } from '../../../controller/webhook-controller.js'

export const router = express.Router()

const controller = new WebhookController()

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

// POST webhooks - add webhook
router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))
