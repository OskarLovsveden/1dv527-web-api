const mongoose = require('mongoose')

const fishSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    position: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
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

const Fish = mongoose.model('Fish', fishSchema)

module.exports = Fish
