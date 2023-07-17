const Search = ({country,search}) =>{
    return(
        <div>
            find countries <input value={country} onChange={search}/>
        </div>
    )
}


export default Search