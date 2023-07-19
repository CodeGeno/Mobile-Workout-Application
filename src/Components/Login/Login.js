import React, { useState, useContext, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { LoginContext } from '../Contexts/LoginContext'
import { UserContext } from '../Contexts/UserContext'
import { auth } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import Wrapper from './LoginWrapper'
import FormRow from '../FormRow'
import { useNavigate } from 'react-router-dom'
function Login() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [login, setLogin] = useState([
    { email: 'kmatagne@gmail.com', pwd: 'kaelkael1' },
  ])
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedIn === true) {
      navigate('/menu')
    }
  }, [loggedIn])

  const accountLogOut = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        console.log('disconnected')
      })
      .catch(() => {
        console.log('erreur')
      })
  }
  const accountLogIn = (e) => {
    e.preventDefault()
    const email = login[0].email
    const password = login[0].pwd
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log('Loged in:', cred.user)
      setUserDetail([{ email: cred.user.email }])
      setLoggedIn(true)
    })
    console.log(userDetail)
  }

  //AddUserToDatabase
  const documentRef = collection(db, 'Users')

  //Create Account + Adding User collection to db
  const accountCreation = (e) => {
    e.preventDefault()
    const email = login[0].email
    const password = login[0].pwd
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log('user created:', cred.user.auth.currentUser.email)
      setUserDetail([{ email: cred.user.auth.currentUser.email }])
      setLogin([{ email: '', pwd: '' }])
      const credentials = cred
      const addUserToDb = async () => {
        await addDoc(documentRef, {
          email: credentials.user.auth.currentUser.email,
        })
      }
      addUserToDb()
    })
  }

  const handleValueChange = (e) => {
    let temp = login[0]
    temp[e.target.name] = e.target.value
    console.log(temp)
    let res = []
    res[0] = temp
    setLogin(res)
  }
  useEffect(() => {
    console.log(login)
  }, [login])

  return (
    <>
      {!showCreateAccount && (
        <>
          <Wrapper>
            <form
              className='form'
              onSubmit={(e) => {
                console.log('hello')
              }}
            >
              <div>Login to your account:</div>

              <FormRow
                type='text'
                value={login.email}
                handleChange={handleValueChange}
                labelText='E-mail'
                name='email'
              />
              <FormRow
                type='password'
                value={login.pwd}
                handleChange={handleValueChange}
                labelText='Password'
                name='pwd'
              />
              <div className='login-btn-container'>
                <button
                  className='btn'
                  type='submit'
                  onClick={(e) => {
                    accountLogIn(e)
                  }}
                >
                  Log In
                </button>
                <button
                  className='btn'
                  type='button'
                  onClick={(e) => {
                    setShowCreateAccount(!showCreateAccount)
                  }}
                >
                  Sign up
                </button>
              </div>
            </form>
          </Wrapper>
        </>
      )}
    </>
  )
}

export default Login
