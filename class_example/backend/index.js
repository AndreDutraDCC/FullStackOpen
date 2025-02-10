const express = require('express')
const app = express()
const cors = require('cors')

const requestLogger = () => (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(cors())  
app.use(express.json())
app.use(express.static('dist'))
//app.use(requestLogger())

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
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    }
    
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
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

const unknownEndpoint = () => (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


