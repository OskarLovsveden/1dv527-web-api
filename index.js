// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'

import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

const main = async () => {
    await connectDB()

    const app = express()

    app.use(helmet())
    app.use(cors())
    app.use(logger('dev'))
    app.use(express.json())

    app.use('/', router)

    app.use(function (err, req, res, next) {
        err.status = err.status || 500

        if (req.app.get('env') !== 'development') {
            res
                .status(err.status)
                .json({
                    status: err.status,
                    message: err.message,
                    _links: {
                        erroneous_path: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                        api_v1: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/api/v1` }
                    }
                })
            return
        }

        return res
            .status(err.status)
            .json({
                status: err.status,
                message: err.message,
                innerException: err.innerException,
                stack: err.stack,
                _links: {
                    erroneous_path: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.originalUrl}` },
                    api_v1: { method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/api/v1` }
                }
            })
    })


    app.listen(process.env.PORT, () => {
        console.log(`Server started on http://localhost:${process.env.PORT}`)
        console.log('Press Ctrl-C to terminate...')
    })
}

main().catch(console.error)