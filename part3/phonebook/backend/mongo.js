const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${encodeURIComponent(password)}@fullstackclassexample.tm97r.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStackClassExample`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 5){
    const [,,, name, number] = process.argv
    const person = new Person({ name, number })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('pronebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

