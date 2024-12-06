import React from 'react'
import './App.css'
import { useEffect,useState,useRef } from 'react';
import {faCheck,faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from './api/axios'
import { Link, useNavigate } from 'react-router-dom';
const USER_REGEX=/^[A-za-z][a-zA-z0-9-_]{3,24}$/;
const PASSWORD_REGEX=/^(?=.*[A-z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&]).{8,24}$/;
   
const Register = () => {
    const userRef=useRef()
    const errRef=useRef()
    const naviagte=useNavigate()
    
    const [user,setUser]=useState('');
    const [validuser,setValiduser]=useState(false);
    const [userFocus,setUserfocus]=useState(false);

    const [password,setPassword]=useState('');
    const [validpassword,setValidPassword]=useState(false);
    const [passwordFocus,setPasswordfocus]=useState(false);

    const [matchpassword,setMatchpassword]=useState('');
    const [validmatchpassword,setValidmatchpassword]=useState(false);
    const [matchpasswordFocus,setMatchpasswordfocus]=useState(false);

   const [errmsg,setErrmsg]=useState('')
   const [success,setSuccess]=useState(false)

   useEffect(()=>{
      userRef.current.focus()
   },[])

   useEffect(()=>{
      const result=USER_REGEX.test(user)
      console.log(result);
      console.log(user);
      setValiduser(result)
   },[user])
   
   useEffect(()=>{
       const result1=PASSWORD_REGEX.test(password)
       console.log(result1);
       console.log(password);
       setValidPassword(result1)
       const match =password===matchpassword
       setValidmatchpassword(match)
       
   },[password,matchpassword])

   useEffect(()=>{

   },[user,password,matchpassword])

   const handlesubmit=async(e)=>{
    e.preventDefault()
    
    const v1=USER_REGEX.test(user)
    const v2=PASSWORD_REGEX.test(password)
    if(!v1||!v2){
        setErrmsg("Invalid Entry")
        return;
    }
    const newlogin={user,password}
    try{
      const response=await axios.post('/login',newlogin)
      console.log(response.data);
      naviagte('/Home')
    }
    catch(err){
        console.log(err);
        
    }
   }

  return (
    <>
     {success ? (
        <section>
            <h1>Success</h1>
            <p>
            <Link to={'/'}>Sign-in</Link>
            </p>
        </section>
     ):(
        <section className='container-section'>
        <p ref={errRef} className={errmsg? 'errmsg':'offscreen'} aria-live='assertive'>hi</p>
        <div className='container-section-div'>
        <h1>REGISTER</h1>
        <div>
        <form onSubmit={handlesubmit} className='container-section-form'>
            <label htmlFor='username'>
                Username :
                <span className={validuser&&userFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={!validuser&&userFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <br/>
            <input
               type='text'
               id='username'
               autoComplete='off'
               ref={userRef}
               required
               onChange={(e)=>setUser(e.target.value)}
               placeholder='Username'
               aria-describedby='uidnote'
               aria-invalid={validuser?"true":"false"}
               onFocus={()=>setUserfocus(true)}
               onBlur={()=>setUserfocus(false)}
            />
            <p id='uidnote' className={userFocus&&user&&!validuser?"instruction":"offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/><br/>   
                4 to 23 Characters.<br/>
                Must begin with a letter.<br/>
                Letters,numbers,underscore,hyphens allowded.
            </p>
            <br/>
             <label htmlFor='password'>
                Password :
                <span className={validpassword&&passwordFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={!validpassword&&passwordFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <br/>
            <input
               type='password'
               id='password'
               ref={userRef}
               autoComplete='off'
               required
               onChange={(e)=>setPassword(e.target.value)}
               placeholder='Username'
               aria-invalid={validpassword?"true":"false"}
               aria-describedby='pidnote'
               onFocus={()=>setPasswordfocus(true)}
               onBlur={()=>setPasswordfocus(false)}
            />
            <p id='pidnote' className={password&&passwordFocus&&!validpassword?"instruction":"offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/><br/> 
              password should contain  
              atleast one uppercase <br/> 
              one lowercase and 
              one special character <br/> 
            </p>
            <br/>
            <label htmlFor='matchpassword'>
                Confirm Password :
                <span className={validmatchpassword&&matchpasswordFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={!validmatchpassword&&matchpasswordFocus?"show":"offscreen"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <br/>
            <input
               type='password'
               id='matchpassword'
               ref={userRef}
               required
               autoComplete='off'
               onChange={(e)=>setMatchpassword(e.target.value)}
               placeholder='Confirm Password'
               aria-describedby='mpidnote'
               aria-invalid={validmatchpassword?"true":"false"}
               onFocus={()=>setMatchpasswordfocus(true)}
               onBlur={()=>setMatchpasswordfocus(false)}
            />
            <p id='mpidnote' className={matchpassword&&matchpasswordFocus&&!validmatchpassword?"instruction":"offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/><br/>
              confirm Password should match password
            </p>
            <br/>
            <button disabled={!validmatchpassword&&!validpassword&&!validuser} className='btn-sub'>
                Sign-up
            </button>
        </form>
        </div>
        <p>
            Already Registered?<br/>
            <span className='link'>
                <Link to={'/'}>Sign-in</Link>
            </span>
        </p>
        </div>
    </section>
     )}
    </>
  )
}

export default Register
