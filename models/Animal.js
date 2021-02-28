import { Schema, model } from 'mongoose'

const animalSchema = new Schema({
    rescuer: {
        type: String,
        required: true
    },
    name: {
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
    facility: {
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
    image: {
        type: String
    }
}, {
    timestamps: true
})

export const Animal = model('Animal', animalSchema)