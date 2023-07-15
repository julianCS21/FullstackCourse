const Persons = ({persons}) =>{
    return (
        <div>
            {persons.map((item,index) =>(
            <div key={index}>
              <h2>{item.name} {item.number}</h2>
            </div>
          ))}
        </div>
    )

}
export default Persons