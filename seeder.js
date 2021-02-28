import { connectDB } from './config/mongoose'
import { Animal } from './models/Animal.js'

const seed = async () => {
    await connectDB()

    const animals = [{
        rescuer: "Nisse",
        name: "Daisy",
        position: {
            latitude: 12345,
            longitude: 67890
        },
        facility: "Farm AB",
        city: "Kalmar",
        species: "Cow",
        weight: 750,
        length: 2.6,
        image: null
    },
    {
        rescuer: "Ellen",
        name: "Bert",
        position: {
            latitude: 54321,
            longitude: 09876
        },
        facility: "Slakteri AB",
        city: "Malmö",
        species: "Pig",
        weight: 300,
        length: 1.5,
        image: null
    }]

    animals.forEach(async a => {
        const animal = new Animal(a)
        await animal.save()
    })
}

seed().catch(console.error)