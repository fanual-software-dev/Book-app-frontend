import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from "axios"
import { UserContext } from './hooks/UserContextProvider'

const Books = () => {
  const [Books,setBooks] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'))

  useEffect(()=>{
    console.log(localStorage.getItem('userData'),"here is the user")
    const fetchbooks = async()=>{
      console.log("userbooks is this",user)
      if (user){
        const book = await fetch('https://book-backend-inky.vercel.app/api/books',{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
        const data = await book.json()
  
        if(book.ok){
  
          setBooks(data)
        }
  
        else{
          console.log(data)
        }
      }

    }

    fetchbooks()
  },[])

  const Logout = async(e)=>{

    e.preventDefault()

    const res = await fetch('https://book-backend-inky.vercel.app/user/logout',{
      method:"POST"
    })

    localStorage.clear()

    navigate('/')

  }

  const Edit = async(id)=>{
    navigate(`/edit/book/${id}`)
  }

  const Detail = async(id)=>{
    navigate(`/details/book/${id}`)
  }
  
  const Delete = async (id) =>{

    try {

      const res = await fetch(`https://book-backend-inky.vercel.app/api/books/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      })

      if (res.ok){
        navigate('/books')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='table-div'>
        <p>Welcome to your books collection !</p>
        <div className='add-div'>
          <button className='btn' onClick={()=>navigate('/add/book')}>ADD BOOK</button>
          <button className='btn1' onClick={(e)=>Logout(e)}>LOG OUT</button>
        </div>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Released date</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            {Books?Books.map((book,id)=>(<tbody key={id}>
                <tr>
                    <td>{id+1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.releasedDate}</td>
                    <td>{formatDistanceToNow(new Date(book.updatedAt),{addSuffix:true})}</td>
                    <td>
                      <div className='collections'>
                      {/* <button></button>
                      <button></button>
                      <button></button> */}
                      <img onClick={()=>Detail(book._id)} title='details' src='more.png' alt='Image not found' width={13} height={13}/>
                      <img onClick={()=>Edit(book._id)} title='edit' src='pencil.png' alt='Image not found' width={13} height={13}/>
                      <img onClick={()=>Delete(book._id)} title='delete' src='delete.png' alt='Image not found' width={13} height={13}/>
                      
                      </div>
                    </td>
                </tr>
            </tbody>)):""}
        </table>  
    </div>
  )
}

export default Books
