require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')


const cors = require('cors')



const app = express()

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

const bodyMissing = (request,response) =>{
    response.status(400).json({error: 'content missing'})
}

const unknowPath = (request,response) =>{
    response.status(400).json({error: 'doesnt exist this resource'})

}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


app.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log(req.body)
    }
    next()
})



app.get('/api/persons',(request,response)=>{
    Person
        .find({})
        .then((persons) =>{

            response.json(persons)
        })
})


app.get('/info',(request,response)=>{
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0')
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0')
    const anio = fechaActual.getFullYear();
    const horas = fechaActual.getHours().toString().padStart(2, '0')
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0')
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0')
    const fechaHoraActual = `${mes}/${dia}/${anio}, ${horas}:${minutos}:${segundos}`
    Person
        .find({})
        .then((persons) =>{
            response.send('Phonebook has info for ' + persons.length + ' people<br><br>' + fechaHoraActual);
        })

   
    
    
})


app.get('/api/persons/:id',(req,res,next) => {
    Person
        .findOne({id:Number(req.params.id)})
        .then(person =>{
            if(person !== null){
                res.status(200)
                res.json(person)
            }
            else{
                res.status(404).json({
                    'error' : 'this person doesnt exist'
                })
            }
      

        }).catch(error => next(error))
      
})
    
  

  




app.delete('/api/persons/:id',(req,res,next) =>{
    Person
        .findOneAndDelete({id:Number(req.params.id)})
        .then(() => {
            res.status(204).json({message : 'this person has been deleted'})
        }).catch(error => next(error))
  
  
})

const random = () =>{
    return Math.floor(Math.random() * 10000000);

}

app.post('/api/persons',(req,res,next)=>{
    const body = req.body
  

    const person = new Person({
        name : body.name,
        number : body.number,
        id : random()


    })

    person.save()
        .then(person =>{
            res.status(200).json(person)
        })
        .catch(error =>next(error))
  
  

})

const updateOptions = { runValidators: true };

app.put('/api/persons/:id',(req,res,next) =>{
  
    Person
        .findOneAndUpdate({id:Number(req.params.id)},req.body,{ new: true, ...updateOptions })
        .then(() =>{
            res.status(202).json(req.body)
        })
        .catch(error => next(error))

    
})


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.use(bodyMissing)
app.use(unknowPath)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log('Server is running on port ' + PORT)
})


