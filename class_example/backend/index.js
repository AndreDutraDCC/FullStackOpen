require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Note = require('./models/note')

morgan.token('body', (request, response) => {
  return Object.keys(request.body).length !== 0
  ? JSON.stringify(request.body) : " "
})

const app = express()

app.use(cors())  
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id))) 
        : 0
    return String(maxId + 1)
}

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    const note = notes.find(note => note.id === id)

    if(note){
        newNote = {
            id: id,
            important: "important" in body? Boolean(body.important) : note.important,
            content: "content" in body? body.content : note.content
        }
        notes = notes.filter(note => note.id !== id).concat(newNote)
        
        response.json(newNote)
    } else {
        response.status(404).end()
    }

})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    })

    note.save().then(savedNote => {
        console.log(savedNote)
        response.json(savedNote)
    })

})

const unknownEndpoint = () => (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


