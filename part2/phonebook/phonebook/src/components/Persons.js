

const Persons = ({persons,deletePerson}) =>{
    return (
        <div>
            {persons.map((item,index) =>(
            <div key={item.id}>
              <h2>{item.name} {item.number}</h2>
              <button onClick={() => deletePerson(item.id,item.name)}>delete</button>
            </div>
          ))}
        </div>
    )

}
export default Persons