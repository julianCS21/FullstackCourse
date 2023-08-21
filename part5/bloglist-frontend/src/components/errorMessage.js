const ErrorMessage = ({message,color}) =>{
    const styleMessage = {
        color: color, 
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    
    }


    if(message === null){
        return null
    }

    return(
        <div style={styleMessage}>
          <h1>{message}</h1>
        </div>
    )

}

export default ErrorMessage