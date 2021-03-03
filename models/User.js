// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'User password is required.'],
        minlength: [10, 'The password must be of the minimum length of 10 characters.']
    },
    type: {
        type: String,
        required: true,
        default: 'user'
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id
            delete ret.password
        },
        virtuals: true
    }
})

schema.virtual('id').get(function () {
    return this._id.toHexString()
})

schema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

schema.statics.authenticate = async function (username, password) {
    const user = await this.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid login attempt.')
    }

    return user
}

schema.statics.getById = async function (id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return this.findOne({ _id: id })
    }
}

schema.statics.insert = async function (userData) {
    const user = new User(userData)
    return user.save()
}

export const User = mongoose.model('User', schema)