// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'
import { AccountController } from '../../../controller/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

router.post('/register', (req, res, next) => controller.register(req, res, next))
router.post('/login', (req, res, next) => controller.login(req, res, next))
