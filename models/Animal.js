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
    city: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id
        },
        virtuals: true
    }
})

schema.virtual('id').get(function () {
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