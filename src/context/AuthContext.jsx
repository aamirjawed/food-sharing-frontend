/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState} from "react";
import BASE_URL from "../constant";

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkMe = async () => {
      setLoading(true)
        try {
          const response = await fetch(`${BASE_URL}/me`, {
            method:"GET",
            credentials:"include"
          })

          const data = await response.json()

          if(response.ok){
            setUser(data.data)
          }
        } catch (error) {
          console.log("Error in check me in auth context jsx", error.message)
          setUser(null)
        }finally{
          setLoading(false)
        }
    }
    checkMe()
  }, [])


  return (
    <AuthContext.Provider value={{user, setUser, loading}}>
    {children}
    </AuthContext.Provider>
  )
}