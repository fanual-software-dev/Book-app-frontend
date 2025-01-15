import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import axios from 'axios'
import { UserContext } from './hooks/UserContextProvider'

const Details = () => {
  const {id} = useParams()
  const [book, setBook] = useState('')
  const user = JSON.parse(localStorage.getItem('userData'))

  useEffect(()=>{
    const fetchFunc = async ()=>{
      if(user){
        const res = await fetch(`https://book-backend-inky.vercel.app/api/books/${id}`,{ responseType: 'blob',headers:{
          "Authorization":`Bearer ${user.token}`
        }})
        const data = await res.json()
  
        if (res.ok){
          setBook(data)
          // console.log(typeof(data.image),data.image,"here is the type")
          // const url = new URL(data.image.data.data[0])
          
          // setimage(url)
        }
  
        else{console.log(res,"Opps error")}
      }
    }

    fetchFunc();
  },[id])


  return (
    <div className='details'>
      <div className='details-div'>
        {book.image?<img src={book.image} loading='lazy'/>:""}
        <div className='details-text'>
          <p><span>Book Title :</span> {book?book.title:""}</p>
          <p><span>Book Author : </span>{book?book.author:""}</p>
          <p><span>Released Date :</span> {book?book.releasedDate:""}</p>
          <p><span>Created At :</span> {book?formatDistanceToNow(new Date(book.createdAt),{addSuffix:true}):""}</p>
          <p><span>Last Updated :</span> {book?formatDistanceToNow(new Date(book.updatedAt),{addSuffix:true}):""}</p>
        </div>
      </div>
    </div>
  )
}

export default Details
