const Filter = ({value,process}) =>{
    return (
        <div>
            find : <input value={value} onChange={process}/>
        </div>
        
    )


}

export default Filter