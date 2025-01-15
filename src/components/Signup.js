import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './hooks/UserContextProvider'

const Signup = () => {
  const [firstname,setfirstname] = useState('')
  const [lastname,setlastname] = useState('')
  const [phone,setphone] = useState('')
  const [email,setemail] = useState('')
  const [password,setPassword] = useState('')
  const [isfailed,setIsfailed] = useState(false)
  const navigate = useNavigate()
  const {user,dispatch} = useContext(UserContext)


  const LoginFunc = async (e)=>{
      
      e.preventDefault()

      if ( firstname && lastname && email && phone && password ){
          try {

              const userInfo = {firstname, lastname, phone, email, password}

              const res = await fetch('https://book-backend-inky.vercel.app/user/signup',{
                  method:"POST",
                  body:JSON.stringify(userInfo),
                  headers:{
                      'Content-Type':'application/json'
                  }
              })

              if(!res.ok){
                  setIsfailed(true)
                  return
              }
  
              const UserData = await res.json()
              
              
              dispatch({type:"LOGIN",payload:UserData})
              localStorage.setItem('user',JSON.stringify(UserData))
              console.log("here is the user",user)
              navigate('/books')

              
              
              setemail('')
              setPassword('')
              setIsfailed(false)
              
          } catch (error) {
              console.log(error)
              setIsfailed(true)
          }
      }

      else{
        setIsfailed(true)
      }


      
  }

  
  return (
    <div className='form-div'>
        <p className='p'>Hello there ! Welcome to our book app.</p>
        <form onSubmit={LoginFunc}>
            <p>Signup Form</p>
            <label>First name <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>setfirstname(e.target.value)} placeholder='Enter your first name'/>
            <label>Last name <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>setlastname(e.target.value)} placeholder='Enter your last name'/>
            <label>Phone number <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>setphone(e.target.value)} placeholder='Enter your phone number'/>
            <label>Email <sup className='span'>*</sup></label>
            <input type='email' onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email'/>
            <label>Password <sup className='span'>*</sup></label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>

            <div className='login-div'>
                <button type='submit' >SIGN UP</button>
                <p>Already have an account ? <span onClick={()=>navigate('/')}>Login here</span></p>
            </div>
            {isfailed && <p className='failed'>Signup failed. please fill all the required fileds.</p>}
        </form>
      
    </div>
  )
}

export default Signup
