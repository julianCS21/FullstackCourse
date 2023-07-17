import Weather from "./Wheater"



const Countrie = ({infoCountrie,show,showInfo}) =>{
    const arrayLanguages = Object.entries(infoCountrie.languages)


    if(showInfo){
        return(
            <div>
                <h1>{infoCountrie.name.common}</h1>
                <br></br>
                <p>capital {infoCountrie.capital[0]}</p>
                <br></br>
                <p> population {infoCountrie.population}</p>
                <br></br>
                <h1>languages</h1>
                {arrayLanguages.map(([key,value]) => (
                    <div key={key}>
                        <ul>{value}</ul>
                    </div>
                ))}
                <img src={infoCountrie.flags.png} alt={infoCountrie.name.common}></img>
                <h1>wheater in {infoCountrie.name.common}</h1>
                <br></br>
                <Weather country={'Colombia'}></Weather>
            </div>
        
        )
    }
    return(
        <div>
            <h1>{infoCountrie.name.common}</h1>
            <button onClick={show}>show</button>
        </div>
    )


}


export default Countrie