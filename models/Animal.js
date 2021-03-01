import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    rescuer: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
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
    toJSON: {
        transform: (doc, ret) => delete ret._id,
        virtuals: true
    },
    timestamps: true,
    versionKey: false
})

schema.virtual('id').get(() => {
    return this._id.toHexString()
})

schema.statics.getById = async function (id) {
    return this.findOne({ _id: id });
}

schema.statics.insert = async function (animalData) {
    const animal = new Animal(animalData)
    return animal.save()
}

export const Animal = mongoose.model('Animal', schema)