const FormPerson = ({name,phone,process,nameProcess,phoneProcess}) =>{
    return (
        <div>
            <form onSubmit={process}>
            name: <input value={name} onChange={nameProcess} />
            number : <input value={phone} onChange={phoneProcess}/>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
       
    )


}

export default FormPerson