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

schema.statics.insert = async function (webhookData) {
    const webhook = new Webhook(webhookData)
    return webhook.save()
}

export const Webhook = mongoose.model('Webhook', schema)