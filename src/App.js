import React, { useState, useMemo, useContext } from 'react'
import Login from './Components/Login/Login'
import { LoginContext } from './Components/Contexts/LoginContext'
import { Menu } from './Menu'
import { UserContext } from './Components/Contexts/UserContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CreateWorkout } from './Pages/CreateWorkout'
import AddNewWorkout from './Components/Exercises/AddNewWorkout'
import ProtectedRoute from './Components/ProtectedRoute'
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userDetail, setUserDetail] = useState([{ email: 'blabla' }])

  return (
    <>
      <>
        <BrowserRouter>
          <UserContext.Provider value={{ userDetail, setUserDetail }}>
            <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route
                  path='/menu'
                  element={
                    <ProtectedRoute>
                      <Menu />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/createWorkout'
                  element={
                    <ProtectedRoute>
                      <CreateWorkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/AddWorkout'
                  element={
                    <ProtectedRoute>
                      <AddNewWorkout />
                    </ProtectedRoute>
                  }
                />
                <Route path='/*' element={Login} />
              </Routes>
            </LoginContext.Provider>
          </UserContext.Provider>
        </BrowserRouter>
      </>
    </>
  )
}

export default App
