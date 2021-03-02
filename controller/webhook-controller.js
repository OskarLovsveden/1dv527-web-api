import createError from 'http-errors'
import { Webhook } from '../models/Webhook.js'

export class WebhookController {
    async create(req, res, next) {
        try {
            const webhook = await Webhook.insert({
                user: req.user.username,
                name: req.body.name,
                url: req.body.url
            })

            res.status(201)
            res.json(webhook)
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
}