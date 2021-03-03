// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'
import { AnimalController } from '../../../controller/animal-controller.js'
import { authenticateJWT } from '../../../helpers/auth.js'
import { hasPermission } from '../../../helpers/permission.js'

export const router = express.Router()

const controller = new AnimalController()

router.param('id', (req, res, next, id) => controller.loadAnimal(req, res, next, id))

router.get('/',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, true),
    (req, res, next) => controller.findAll(req, res, next))

router.get('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, true),
    (req, res, next) => controller.find(req, res, next))

router.post('/',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.create(req, res, next))

router.put('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.update(req, res, next))

router.delete('/:id',
    authenticateJWT,
    (req, res, next) => hasPermission(req, res, next, false),
    (req, res, next) => controller.delete(req, res, next))
