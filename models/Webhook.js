import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    errorCounter: {
        type: Number,
        required: true,
        default: 0,
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
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return this.findOne({ _id: id })
    }
}

schema.statics.insert = async function (webhookData) {
    const webhook = new Webhook(webhookData)
    return webhook.save()
}

export const Webhook = mongoose.model('Webhook', schema)