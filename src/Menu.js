import { useState, useContext } from 'react'
import { CreateWorkout } from './Components/CreateWorkout/CreateWorkout'
import Exercice from './Components/Exercises/Exercice'
import { UserContext } from './Components/Contexts/UserContext'
export const Menu = () => {
  const [showCreateWorkout, setShowCreateWorkout] = useState(false)
  const { userDetail, setUserDetail } = useContext(UserContext)

  const [showAddWorkout, setShowAddWorkout] = useState(false)
  return (
    <>
      <section className='menu-section'>
        <div className='return-btn-container '>
          {(showCreateWorkout || showAddWorkout) && (
            <button
              className='return-btn menu-btn'
              onClick={() => {
                setShowCreateWorkout(false)
                setShowAddWorkout(false)
              }}
            >
              return
            </button>
          )}
        </div>
        <div className='Application-container'>
          {!showCreateWorkout && !showAddWorkout && (
            <>
              <button
                className='menu-btn'
                onClick={() => {
                  setShowAddWorkout(true)
                }}
              >
                Add workouts
              </button>
              <button
                className='menu-btn'
                onClick={() => {
                  setShowCreateWorkout(true)
                }}
              >
                Create workout
              </button>
              <button
                className='menu-btn'
                onClick={() => {
                  console.log(userDetail)
                }}
              >
                Clg
              </button>
            </>
          )}
          <>{showAddWorkout && <Exercice />}</>
          <>{showCreateWorkout && <CreateWorkout />}</>
        </div>
      </section>
    </>
  )
}
