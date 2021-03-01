import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { connectDB, disconnectDB } from '../config/mongoose.js'
import { Animal } from '../models/Animal.js'

const config = {
    dictionaries: [names]
}

const animals = [...Array(20)].map(() => ({
    rescuer: uniqueNamesGenerator(config),
    name: uniqueNamesGenerator(config),
    city: "Kalmar",
    species: "Cow"
}))

const seed = async () => {

    console.log("Seeding started")
    await connectDB()

    animals.forEach(async (a, index) => {
        await Animal.create(a)

        if (index = animals.length - 1) {
            console.log("Seeding done")
            await disconnectDB()
        }
    })
}

seed().catch(console.error)