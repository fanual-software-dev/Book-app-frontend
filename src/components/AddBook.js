import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './hooks/UserContextProvider'

const AddBook = () => {
    const [title,settitle] = useState('')
    const [author,setauthor] = useState('')
    const [releasedDate,setreleaseddate] = useState('')
    const [image,setimage] = useState('')
    const [isfailed,setIsfailed] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userData'))

    const handleFile = (e)=>{
        const file = e.target.files[0]

        setimage(file)
    }

    const LoginFunc = async(e)=>{
        
        e.preventDefault()

        try {

            const formdata = new FormData()

            formdata.append('file',image)
            formdata.append('upload_preset', 'docuploads')
  
            const result = await axios.post(`https://api.cloudinary.com/v1_1/dmzvqehan/upload`,formdata)
            let url = ""
  
            if (result.statusText==="OK"){
              url =  result.data.secure_url
            }
  
            else{
              setimage('')
            }

            const book = {title,author,releasedDate,image:url}

            const res = await fetch('https://book-backend-inky.vercel.app/api/books',{
                method:"POST",
                body:JSON.stringify(book),
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":`Bearer ${user.token}`
                }
            })

            if(!res.ok){
                setIsfailed(true)
                return
            }

            navigate('/books')
            setIsfailed(false)
            
        } catch (error) {
            console.log(error)
            setIsfailed(true)
        }
    }

  return (
    <div className='form-div'>
        <form onSubmit={LoginFunc}>
            <p>Add book to your books collection !</p>
            <label>Book title <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>settitle(e.target.value)} placeholder='Enter book title'/>
            <label>Author <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>setauthor(e.target.value)} placeholder='Enter book author'/>
            <label>Released date <sup className='span'>*</sup></label>
            <input type='number' onChange={(e)=>setreleaseddate(e.target.value)} placeholder='Enter released date'/>
            <label>Set image <sup className='span'>*</sup> </label>
            <input type='file' onChange={handleFile} placeholder='Enter image'/>
            <div className='login-div'>
                <button type='submit' >ADD BOOK</button>
            </div>
            {isfailed && <p className='failed'>Book creation failed. please fill out all the required fileds.</p>}
        </form>
      
    </div>
  )
}

export default AddBook
