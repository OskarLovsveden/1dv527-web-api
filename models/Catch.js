const mongoose = require('mongoose')

const catchSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    bodyOfWater: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    links: {
        img: {
            type: String
        }
    }
}, {
    timestamps: true
})

const Catch = mongoose.model('Catch', catchSchema)

module.exports = Catch
