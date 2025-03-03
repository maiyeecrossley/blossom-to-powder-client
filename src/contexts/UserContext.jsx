import { createContext, useState } from 'react'
import { getUserFromToken } from '../utils/auth'

const UserContext = createContext(null)

function UserProvider({ children }){
  const [user, setUser] = useState(getUserFromToken())

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }