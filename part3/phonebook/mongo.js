const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.fpurz6z.mongodb.net/?retryWrites=true`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  Name: String,
  Number: String,
  id : Number
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    Name: process.argv[3],
    Number: process.argv[4],
    id : Math.floor(Math.random()*1000000)

  
})

person.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

if (process.argv.length === 3){
    Person
        .find({})
        .then((persons) =>{
            console.log("phonebook:\n")
            persons.forEach((element) =>{
                if(element.Name !== undefined && element.Number !== undefined)
                console.log(element.Name + " " + element.Number + "\n")

            })
            mongoose.connection.close()
        }) 

}
