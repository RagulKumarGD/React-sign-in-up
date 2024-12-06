import React, { useEffect, useRef, useState } from 'react'
import axios from './api/axios'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
import { faL } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
    const [user,setUser]=useState('')
    const [password,setPassword]=useState('')
    const [success,setSuccess]=useState(false)
    const navigate=useNavigate()

    const handlesubmit=async(e)=>{
        console.log(user);
        console.log(password);
        
        e.preventDefault();
        try{
            const response=await axios.get('/login')
        response.data.map((i)=>{
          <span key={i.id}>
          { i.user===user && i.password===password ?  navigate('/Home')
          :null
          }
          </span>    
          
            
        })
        }
        catch(err){
            console.log(err);
            
        }
    }
  return (
   <>
    {success ?(
        <section>
            <p>Logged in</p>
        </section>):
    ( <section>
        <h1>LOG-IN</h1>
        <form onSubmit={handlesubmit}>
           <label htmlFor='username'>
            Username:</label> 
            <br/>
            <input 
              id='username'
              required
              type='text'
            //   ref={userRef}
              placeholder='Username'
              autoComplete='off'
              onChange={(e)=>setUser(e.target.value)}
            />
            <br/>
           <label htmlFor='password'>
            Password:</label> 
            <br/>
            <input 
              id='password'
              required
              type='password'
              placeholder='Password'
              autoComplete='off'
              onChange={(e)=>setPassword(e.target.value)}
            />
            <br/>
            <button>SUBMIT</button>
        </form>
        <p>
            Don't have an account?<br/>
            <span className='link'>
                <Link to={'/register'}>Sign-up</Link>
            </span>
        </p>
    </section>)
    
    }
   </>
  )
}

export default Login
