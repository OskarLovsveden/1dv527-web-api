import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as usersRouter } from './user-router.js'
// import { router as tasksRouter } from './tasks-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Lovsveden API v1' }))
router.use('/', accountRouter)
router.use('/users', usersRouter)
// router.use('/animals', animalsRouter)

// TODO

// POST /users - add user
// POST /login
// POST /logout

// GET /fishes - gets all catches
// POST /fishes - adds new catch
// PUT /fishes/:id - updates info on a catch
// DELETE /fishes/:id - deletes catch

