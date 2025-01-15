import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './hooks/UserContextProvider'

const Edit = () => {
  const {id} = useParams()
  const [title,settitle] = useState('')
  const [author,setauthor] = useState('')
  const [releasedDate,setreleaseddate] = useState('')
  const [file,setFile] = useState('')
  const [isfailed,setIsfailed] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'))

  useEffect(()=>{

    const fetchFunc = async ()=> {
      if(user){
        const res = await fetch(`https://book-backend-inky.vercel.app/api/books/${id}`,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
        const data = await res.json()
  
        if (res.ok){
          settitle(data.title)
          setauthor(data.author)
          setreleaseddate(data.releasedDate)
          console.log(data,"here is the data")
        }
      }
    }

    fetchFunc()
  },[id])

  const handleFile = (e)=>{
    const filepath = e.target.files[0]
    setFile(filepath)
  }

  const EditFunc = async(e)=>{
      
      e.preventDefault()

      try {

        if(user){
          const formdata = new FormData()

          formdata.append('file',file)
          formdata.append('upload_preset', 'docuploads')

          let result = ""

          if (file){
            result = await axios.post(`https://api.cloudinary.com/v1_1/dmzvqehan/upload`,formdata)
          }

          let imgpath = ''

          if (result && result.statusText==="OK"){
            imgpath = result.data.secure_url
          }


          const book = {title,author,releasedDate,image:imgpath}

          

          const res = await fetch(`https://book-backend-inky.vercel.app/api/books/${id}`,{
            method:"PATCH",
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
        }
          
      } catch (error) {
          console.log(error)
          setIsfailed(true)
      }
  }
  
  return (
    <div className='form-div'>
        <form onSubmit={EditFunc}>
            <p>Edit book from your books collection !</p>
            <label>Book title <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>settitle(e.target.value)} value={title} placeholder='Enter book title'/>
            <label>Author <sup className='span'>*</sup></label>
            <input type='text' onChange={(e)=>setauthor(e.target.value)} value={author} placeholder='Enter book author'/>
            <label>Released date <sup className='span'>*</sup></label>
            <input type='number' onChange={(e)=>setreleaseddate(e.target.value)} value={releasedDate} placeholder='Enter released date'/>
            <label>Set image</label>
            <input type='file' onChange={handleFile}  accept='image/*' placeholder='Enter book author'/>
            <div className='login-div'>
                <button type='submit' >EDIT BOOK</button>
            </div>
            {isfailed && <p className='failed'>Book edition failed. please try again.</p>}
        </form>
      
    </div>
  )
}

export default Edit
