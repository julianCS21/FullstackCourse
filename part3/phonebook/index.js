const express = require('express')
const morgan = require('morgan')

const cors = require('cors')


const app = express()


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body);
  }
  next();
});

var persons = [
    {
        "name" : "Arto Hellas",
        "number" : "040-123456",
        "id":1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }

]

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})


app.get('/info',(request,response)=>{
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

    const fechaHoraActual = `${mes}/${dia}/${anio}, ${horas}:${minutos}:${segundos}`;
    response.send('Phonebook has info for ' + persons.length + ' people<br><br>' + fechaActual);
    
})


app.get('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  const personId = persons.find(person => person.id === id)
  if(personId){
    res.json(personId)

  }
  else{
    res.status(404).end
  }

  

})


app.delete('/api/persons/:id',(req,res) =>{
  const idDelete = Number(req.params.id)
  let findId = persons.filter((element) => element.id === idDelete)
  if(findId){
    persons = persons.filter((element) => element.id !== idDelete)
    res.status(204).end
  }
  else{
    res.status(404).end
  }
  
  
})

const random = () =>{
  return Math.floor(Math.random() * 10000000);

}

app.post('/api/persons',(req,res)=>{
  const newPerson = req.body
  const id = random()
  newPerson.id = id
  const inObject = persons.find((element) => element.name === newPerson.name)
  if(inObject){
    res.status(400).json({'error' : 'name must be unique'})

  }
  if(newPerson.name === '' || newPerson.number === ''){
    res.status(400).json({'error' : 'missing content'})

  }

  persons.push(newPerson)
  res.json(newPerson)
  

})


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('Server is running on port ' + PORT)
})


