// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'
import { UserController } from '../../../controller/user-controller.js'
import { authenticateJWT } from '../../../helpers/auth.js'
import { hasPermission } from '../../../helpers/permission.js'

export const router = express.Router()

const controller = new UserController()

router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

router.get('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.find(req, res, next))

router.get('/',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.findAll(req, res, next))

router.delete('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.delete(req, res, next))
