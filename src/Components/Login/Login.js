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
    { email: 'JohnDoe@gmail.com', pwd: 'john1234' },
  ])
  const [alert, setAlert] = useState({
    show: false,
    alertType: 'success',
    message: '',
  })
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
      .catch((error) => {
        console.log(error)
      })
  }
  const accountLogIn = async (e) => {
    e.preventDefault()
    const email = login[0].email
    const password = login[0].pwd
    try {
      await signInWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log('Loged in:', cred.user)
        setUserDetail([{ email: cred.user.email }])
        setLoggedIn(true)
      })
    } catch (error) {
      displayAlert('Wrong credentials', 'danger')
    }
  }

  //AddUserToDatabase
  const documentRef = collection(db, 'Users')

  //Create Account + Adding User collection to db
  const accountCreation = async (e) => {
    e.preventDefault()
    const email = login[0].email
    const password = login[0].pwd
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (cred) => {
          setUserDetail([{ email: cred.user.auth.currentUser.email }])
          setLogin([{ email: '', pwd: '' }])
          const credentials = cred
          const addUserToDb = async () => {
            await addDoc(documentRef, {
              email: credentials.user.auth.currentUser.email,
            })
          }
          addUserToDb()
        }
      )
      displayAlert('Account created', 'success')
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).')
        displayAlert('This email is already in use', 'danger')
    }
  }
  const displayAlert = (message, alertType) => {
    setAlert({ show: true, message: message, alertType: alertType })
    setTimeout(() => {
      setAlert({ show: false, message: '' })
    }, 3000)
  }
  const handleValueChange = (e) => {
    let temp = login[0]
    temp[e.target.name] = e.target.value
    let res = []
    res[0] = temp
    setLogin(res)
  }

  return (
    <>
      <>
        <Wrapper>
          <form className='form'>
            <div>
              {showCreateAccount
                ? 'Create your account'
                : 'Login to your account:'}
            </div>
            {alert.show && alert.alertType === 'danger' ? (
              <>
                <div className='danger'>{alert.message}</div>
              </>
            ) : (
              <div className='success'>{alert.message}</div>
            )}
            <FormRow
              type='text'
              value={login[0].email}
              handleChange={handleValueChange}
              labelText='E-mail'
              name='email'
            />
            <FormRow
              type='password'
              value={login[0].pwd}
              handleChange={handleValueChange}
              labelText='Password'
              name='pwd'
            />
            <div className='login-btn-container'>
              <button
                className='btn'
                type='submit'
                onClick={(e) => {
                  showCreateAccount ? accountCreation(e) : accountLogIn(e)
                }}
              >
                {showCreateAccount ? 'Create account' : 'Login'}
              </button>
              <button
                className='btn'
                type='button'
                onClick={(e) => {
                  setShowCreateAccount(!showCreateAccount)
                }}
              >
                {showCreateAccount ? 'Cancel' : 'Create account'}
              </button>
            </div>
          </form>
        </Wrapper>
      </>
    </>
  )
}

export default Login
