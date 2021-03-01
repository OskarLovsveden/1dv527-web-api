import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as userRouter } from './user-router.js'
import { router as animalRouter } from './animal-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Lovsveden API v1' }))
router.use('/', accountRouter)
router.use('/users', userRouter)
router.use('/animals', animalRouter)