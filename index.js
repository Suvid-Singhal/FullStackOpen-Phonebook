const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
//app.use(morgan("tiny"))
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
app.use(cors())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
    let date = new Date();
    response.send(`Phonebook has info for ${notes.length} people<br />${date}`)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else{
        response.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    if(!newPerson.name || !newPerson.number){
        return response.status(400).json({ 
            error: 'content missing' 
        })
    }
    else{
        const person = {
            id:Math.round(Math.random()*5000),
            name:newPerson.name,
            number:newPerson.number,
        }
        if(persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())){
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        }
        persons = persons.concat(person)
        return response.json(person)
        
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})