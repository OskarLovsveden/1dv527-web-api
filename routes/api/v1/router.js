import express from 'express'

import { router as accountRouter } from './account-router.js'
import { router as userRouter } from './user-router.js'
import { router as animalRouter } from './animal-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()

const root = (req, res) => {
    res.json({
        _links: [
            {
                rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            {
                rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/register`
            },
            {
                rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/login`
            },
            {
                rel: 'users', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/users`
            },
            {
                rel: 'animals', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/animals`
            },
            {
                rel: 'webhooks', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}/webhooks`
            }
        ],
        _embedded: { message: 'Lovsveden API v1' }
    })
}

router.get('/', (req, res) => root(req, res))
router.use('/', accountRouter)
router.use('/users', userRouter)
router.use('/animals', animalRouter)
router.use('/webhooks', webhookRouter)