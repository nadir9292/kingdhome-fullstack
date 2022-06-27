import { createContext, useCallback, useState } from "react"

const initialjwt =
  typeof window === "undefined" ? null : localStorage.getItem("session_jwt")

const initialId =
  typeof window === "undefined" ? null : localStorage.getItem("id")

const initialUsername =
  typeof window === "undefined" ? null : localStorage.getItem("username")

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setjwt] = useState(initialjwt)
  const [id, setId] = useState(initialId)
  const [username, setUsername] = useState(initialUsername)

  const savejwt = useCallback((jwt, id, username) => {
    localStorage.setItem("session_jwt", jwt)
    localStorage.setItem("id", id)
    localStorage.setItem("username", username)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("session_jwt")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    setjwt(null)
    setId(null)
    setUsername(null)
  })

  return (
    <AppContext.Provider
      {...props}
      value={{ savejwt, setId, logout, jwt, id, username }}
    />
  )
}

export default AppContextProvider
