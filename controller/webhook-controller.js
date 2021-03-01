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
            next(error)
        }
    }
}