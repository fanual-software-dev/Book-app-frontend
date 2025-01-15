import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext()

const reducerfunc = (state,action)=>{

    switch(action.type){

        case "LOGIN":
            return {user:action.payload}

        case "LOGOUT":
            return {user:null}

        default:
            return state
    }
}

export const UserContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducerfunc,{
        user:null
    })

    useEffect(()=>{
        const User = JSON.parse(localStorage.getItem('userData'))
        
        console.log(User,"Here is the local stroage user")
        if (User){
            console.log("Hello please",typeof(User))
            dispatch({type:"LOGIN",payload:User})
        }
    },[])

    return (
        <UserContext.Provider value={{...state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}