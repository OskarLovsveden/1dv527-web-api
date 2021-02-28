import express from 'express'
import { UserController } from '../../../controller/user-controller.js'

export const router = express.Router()

const controller = new UserController()

router.get('/', (req, res, next) => res.json('nah dude'))
router.post('/', (req, res, next) => controller.register(req, res, next))
