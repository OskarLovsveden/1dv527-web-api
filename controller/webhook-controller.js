import createError from 'http-errors'
import { Webhook } from '../models/Webhook.js'

export class WebhookController {
    async loadWebhook(req, res, next, id) {
        try {
            const webhook = await Webhook.getById(id)

            if (!webhook) {
                next(createError(404))
                return
            }

            req.webhook = webhook
            next()
        } catch (error) {
            next(error)
        }
    }

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

    async delete(req, res, next) {
        try {
            await req.webhook.delete()

            res.status(204)
            res.end()
        } catch (error) {
            next(error)
        }
    }
}