import React, { useState, } from 'react';


function DisplayInfo(props)
{
    return(
        <div>
        <h1>Email: {props.e}</h1>
        <h1>Password: {props.p}</h1>
        </div>
    );
}

function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
   
  return (
    <div>
        <h1>Login</h1>
        <label>Email Address</label>
        <input type="email" onChange={(e)=>{setEmail(e.target.value);}}/><br />
        <label>Password</label>
        <input type="password" onChange={(e)=>{setPassword(e.target.value);}}/><br />
        <button onClick={()=>{<DisplayInfo e={email} p={pass} />}}>
        Login
        </button>
        
    </div>
  );
}

export default LoginPage;