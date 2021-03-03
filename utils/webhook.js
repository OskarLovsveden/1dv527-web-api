import { Webhook } from '../models/Webhook.js'
import axios from 'axios'

export const sendToWebhookSubscribers = async (data) => {

    const webhooks = await Webhook.find({})

    for (const webhook of webhooks) {
        try {
            const res = await axios({
                url: webhook.url,
                method: 'POST',
                timeout: 5000,
                data: data
            })

            if (res.status === 200) {
                console.log(`Webhook sent to ${webhook.url}`)
            }

        } catch (error) {
            console.error('Error: ' + error.message)
            webhook.errorCounter++
            await webhook.save()
        }
    }
}