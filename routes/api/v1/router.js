// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'

import { router as accountRouter } from './account-router.js'
import { router as userRouter } from './user-router.js'
import { router as animalRouter } from './animal-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()

const root = (req, res) => {
    res.json({
        _links: {
            self: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
            register: { method: 'POST', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/register` },
            login: { method: 'POST', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/login` },
            users: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/users` },
            animals: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/animals` },
            webhooks: { method: 'POST', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/webhooks` }
        },
        _embedded: { message: 'Lovsveden API v1 - Welcome!' }
    })
}

router.get('/', (req, res) => root(req, res))
router.use('/', accountRouter)
router.use('/users', userRouter)
router.use('/animals', animalRouter)
router.use('/webhooks', webhookRouter)