const LoginForm = ({username,password,changeUsername,changePassword,loginProcess}) =>{
    return (
        <div>
            <h1>Login with your account</h1>
            <form onSubmit={(event) =>{
                loginProcess(event)
            }}>
                Username : <input type="text" value={username} name="username" onChange={({target}) => changeUsername(target)}  ></input>
                <br></br>
                 Password : <input type="password" value={password} name="password" onChange={({target}) => changePassword(target)}></input>
                 <br></br>
                <button type="submit">login</button>
            </form>
        </div>

    )
}

export default LoginForm