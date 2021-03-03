import express from 'express'
import { WebhookController } from '../../../controller/webhook-controller.js'
import { authenticateJWT } from '../../../helpers/auth.js'

export const router = express.Router()

const controller = new WebhookController()

router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))
