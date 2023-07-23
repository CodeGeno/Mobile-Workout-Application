import { useContext, useState } from 'react'

import { UserContext } from '../Components/Contexts/UserContext'
import { createWorkoutInDb } from '../firebase'
import Wrapper from '../Components/CreateWorkout/CreateWorkoutWrapper'
import HomeButton from '../Components/HomeButton/HomeButton'
export const CreateWorkout = () => {
  const { userDetail } = useContext(UserContext)

  const [newWorkoutTitle, setNewWorkoutTitle] = useState([
    {
      workout: '',
    },
  ])
  const [newExercise, setNewExercise] = useState([
    {
      exercise: '',
    },
  ])

  const addMore = () => {
    setNewExercise([
      ...newExercise,
      {
        exercise: '',
      },
    ])
  }
  const handleExercisesInputs = (e, ind, index) => {
    const value = e.target.value
    const result = [...newExercise]
    result[ind][index] = value
    setNewExercise(result)
  }
  return (
    <>
      <Wrapper className='form'>
        <HomeButton />
        <h1>Create a new Workout</h1>

        <div>
          <label className='form-label' htmlFor='Workout name'>
            Workout Name :
          </label>
          <input
            className='form-input'
            type='text'
            onChange={(e) => {
              setNewWorkoutTitle([{ workout: e.target.value }])
            }}
          />
        </div>

        <div>
          {newExercise?.map((Exercise, ind) => (
            <div className='single-ex' key={ind}>
              <div>
                <label className='form-label' htmlFor='Workout name'>
                  Exercise {ind + 1}:
                </label>
                <input
                  className='form-input'
                  key={Exercise + ind}
                  type='text'
                  onChange={(e) => {
                    handleExercisesInputs(e, ind, 'exercise')
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => addMore()}>
            Add More
          </button>
          <button
            className='btn'
            onClick={() => {
              createWorkoutInDb(
                userDetail[0].email,
                newWorkoutTitle[0].workout,
                newExercise
              )

              setNewWorkoutTitle([{ workout: '' }])
              setNewExercise([
                {
                  exercise: '',
                },
              ])
            }}
          >
            Save
          </button>
        </div>
      </Wrapper>
    </>
  )
}
