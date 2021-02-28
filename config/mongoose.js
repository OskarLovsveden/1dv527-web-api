import { connection, connect } from 'mongoose'

export const connectDB = async () => {
    connection.on('connected', () => console.log('Mongoose connection is open.'))
    connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
    connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

    process.on('SIGINT', () => {
        connection.close(() => {
            console.log('Mongoose connection is disconnected due to application termination.')
            process.exit(0)
        })
    })

    return connect(process.env.DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
