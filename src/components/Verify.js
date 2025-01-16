import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Verify = () => {
    const [first,setfirst] = useState('')
    const [second,setsecond] = useState('')
    const [third,setthird] = useState('')
    const [fourth,setfourth] = useState('')
    const [fifth,setfifth] = useState('')
    const [six,setsix] = useState('')
    const [isfailed,setIsfailed] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userData'))

    const verify_no = user.verif_no


    const LoginFunc = async (e)=>{
        
        e.preventDefault()
        setLoading(true)
        const verification_string = first+second+third+fourth+fifth+six
        const verification_no = parseInt(verification_string, 10)

        if (!first||!second||!third||!fourth||!fifth||!six){
            setIsfailed(true)
            setLoading(false)
            console.log("Missed Fields")
            return
        }

        if (verification_no===verify_no){
            navigate('/books')
            setIsfailed(false)
            setLoading(false)
        }


        else{
            setIsfailed(true)
            setLoading(false)
            console.log(user)
            console.log("Bad Auth",typeof(verification_no),typeof(verify_no))
        }


        
    }

  return (
    <div className='form-div'>
        <form onSubmit={LoginFunc} >
            <p>Please enter verification number</p>
            <div className='verify-form'>
                <input type='text' onChange={(e)=>setfirst(e.target.value)} placeholder='0'/>
                <input type='text' onChange={(e)=>setsecond(e.target.value)} placeholder='0'/>
                <input type='text' onChange={(e)=>setthird(e.target.value)} placeholder='0'/>
                <input type='text' onChange={(e)=>setfourth(e.target.value)} placeholder='0'/>
                <input type='text' onChange={(e)=>setfifth(e.target.value)} placeholder='0'/>
                <input type='text' onChange={(e)=>setsix(e.target.value)} placeholder='0'/>
            </div>
            <div className='login-div'>
                <button type='submit' disabled={loading}>{!loading && 'Verify'} {loading && "please wait..."}</button>
                
            </div>
            {isfailed && <p className='failed'>Verification failed. Please either fill all the required fields or check the number.</p>}
        </form>
      
    </div>
  )
}

export default Verify
