import React, { useState, useContext } from 'react'
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
function Login() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [login, setLogin] = useState([
    { email: 'kmatagne@gmail.com', pwd: 'kaelkael1' },
  ])
  const [showCreateAccount, setShowCreateAccount] = useState(false)

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

  const handleLoginInput = (e, ind) => {
    const value = e.target.value
    var log = [...login]
    log[0][ind] = value
    setLogin(log)
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
  return (
    <>
      <>
        <button
          onClick={() => {
            console.log(userDetail[0].email)
          }}
        >
          User
        </button>
      </>
      {!showCreateAccount && (
        <>
          <section className='login-page'>
            <div className='login-form'>
              <form
                onSubmit={(e) => {
                  console.log('hello')
                }}
              >
                <div className='login'>
                  <div>Login to your account:</div>

                  <label htmlFor='email'>E-mail:</label>
                  <input
                    type='text'
                    value={login[0].email}
                    onChange={(e) => {
                      handleLoginInput(e, 'email')
                    }}
                  />
                </div>
                <div className='login'>
                  <label htmlFor='pwd'>Password:</label>
                  <input
                    type='password'
                    value={login[0].pwd}
                    onChange={(e) => {
                      handleLoginInput(e, 'pwd')
                    }}
                  />
                </div>
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
            </div>
          </section>
        </>
      )}
      {showCreateAccount && (
        <>
          <section className='login-page'>
            <div className='login-form'>
              <form
                onSubmit={(e) => {
                  accountCreation(e)
                }}
              >
                <div className='login'>
                  <div>Create your account:</div>

                  <label htmlFor='email'>E-mail:</label>
                  <input
                    type='text'
                    value={login[0].email}
                    onChange={(e) => {
                      handleLoginInput(e, 'email')
                    }}
                  />
                </div>
                <div className='login'>
                  <label htmlFor='pwd'>Password:</label>
                  <input
                    type='text'
                    value={login[0].pwd}
                    onChange={(e) => {
                      handleLoginInput(e, 'pwd')
                    }}
                  />
                </div>
                <div className='login-btn-container'>
                  <button className='btn' type='submit'>
                    Create
                  </button>
                  <button
                    className='btn'
                    onClick={() => {
                      setShowCreateAccount(!showCreateAccount)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Login
