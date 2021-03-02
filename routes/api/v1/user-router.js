import express from 'express'
import { UserController } from '../../../controller/user-controller.js'

export const router = express.Router()

const controller = new UserController()

router.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))
router.get('/:id', (req, res, next) => controller.find(req, res, next))
router.get('/', (req, res, next) => controller.findAll(req, res, next))
