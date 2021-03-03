import express from 'express'
import { UserController } from '../../../controller/user-controller.js'
import { authenticateJWT } from '../../../helpers/auth.js'
import { PermissionLevels, hasPermission } from '../../../helpers/permission.js'

export const router = express.Router()

const controller = new UserController()

router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

router.get('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, PermissionLevels.READ),
    (req, res, next) => controller.find(req, res, next))

router.get('/',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, PermissionLevels.ADMIN),
    (req, res, next) => controller.findAll(req, res, next))
