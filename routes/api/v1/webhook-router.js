// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'
import { WebhookController } from '../../../controller/webhook-controller.js'
import { authenticateJWT } from '../../../helpers/auth.js'
import { hasPermission } from '../../../helpers/permission.js'

export const router = express.Router()

const controller = new WebhookController()

router.param('id', (req, res, next, id) => controller.loadWebhook(req, res, next, id))

router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))

router.delete('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.delete(req, res, next))