import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password is required.'],
        minlength: [10, 'The password must be of the minimum length of 10 characters.']
    }
}, {
    timestamps: true,
    versionKey: false
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
    return this.findOne({ _id: id })
}

schema.statics.insert = async function (userData) {
    const user = new User(userData)
    return user.save()
}

export const User = mongoose.model('User', schema)