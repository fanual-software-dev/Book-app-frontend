import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from './hooks/UserContextProvider'

const Login = () => {

    const [email,setemail] = useState('')
    const [password,setPassword] = useState('')
    const [isfailed,setIsfailed] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {user,dispatch} = useContext(UserContext)


    const LoginFunc = async (e)=>{
        
        e.preventDefault()
        setLoading(true)

        if (email){
            try {

                const userInfo = {email,password}

                const res = await fetch('https://book-backend-inky.vercel.app/user/login',{
                    method:"POST",
                    body:JSON.stringify(userInfo),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                const UserData = await res.json()

                if(!res.ok){
                    setIsfailed(true)
                    setLoading(false)
                    return
                }
                
                
                localStorage.setItem('userData',JSON.stringify(UserData));
                navigate('/books')
                setLoading(false)
                dispatch({type:"LOGIN",payload:UserData})
                // console.log("here is the user",user,user.token)
                
                
                setemail('')
                setPassword('')
                setIsfailed(false)
                
            } catch (error) {
                console.log(error)
                setIsfailed(true)
                setLoading(false)
            }
        }

        else{
            setIsfailed(true)
            setLoading(false)
        }


        
    }

  return (
    <div className='form-div'>
        <p className='p'>Hello there ! Welcome to our book app.</p>
        <form onSubmit={LoginFunc}>
            <p>Login Form</p>
            <label>Username</label>
            <input type='text' onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email'/>
            <label>Password</label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>
            <div className='login-div'>
                <button type='submit' disabled={loading}>{!loading && 'LOG IN'} {loading && "please wait..."}</button>
                <p>Don't have an account yet ? <span onClick={()=>navigate('/signup')}>Signup here</span></p>
            </div>
            {isfailed && <p className='failed'>Login failed. please check your username or password.</p>}
        </form>
      
    </div>
  )
}

export default Login
