import React, { useState, useMemo, useContext } from 'react'
import Login from './Components/Login/Login'
import { LoginContext } from './Components/Contexts/LoginContext'
import { Menu } from './Menu'
import { UserContext } from './Components/Contexts/UserContext'
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userDetail, setUserDetail] = useState([{ email: 'blabla' }])
  return (
    <>
      <UserContext.Provider value={{ userDetail, setUserDetail }}>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          {!loggedIn && <Login />}
          {loggedIn && <Menu />}
        </LoginContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
