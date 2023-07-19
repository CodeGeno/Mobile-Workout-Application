import React, { useState, useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import {
  AddWorkout,
  db,
  getFullWorkout,
  getLastSeanceByWorkout,
} from '../../firebase'

import { useEffect } from 'react'
import SingleExerciseInputs from './SingleExerciseInputs'
import Wrapper from './AddWorkoutWrapper'
import HomeButton from '../HomeButton/HomeButton'

function AddNewWorkout() {
  const [workouts, setWorkouts] = useState([])
  const { userDetail } = useContext(UserContext)
  const [selectedWorkout, setSelectedWorkout] = useState([])
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const date = new Date()
  const today = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  )

  const handleResultsInputs = (e, ind, exName) => {
    if (e === true || e === false) {
      const value = e
      const result = [...results]
      result[ind][exName] = value
      setResults([...result])

      return
    }
    if (typeof e.target.value === ('string' || 'number')) {
      const value = e.target.value
      const result = results
      result[ind][exName] = value
      setResults([...result])
    }
  }

  const fetchWorkoutData = async () => {
    let data = await getLastSeanceByWorkout(
      workouts,
      selectedWorkout,
      userDetail[0].email,
      today
    )
    setResults([...data])
  }

  useEffect(() => {
    getFullWorkout(userDetail[0].email).then((data) => {
      setWorkouts(data)
    })
  }, [])

  useEffect(() => {
    fetchWorkoutData()
  }, [selectedWorkout])

  return (
    <>
      <Wrapper>
        <div className='form'>
          <HomeButton />
          <div className='workout-select-section'>
            <h1 className='form-label' htmlFor='Workout'>
              Choose a workout:
            </h1>
            <select
              className='form-select'
              name='workout'
              onChange={(e) => {
                setSelectedWorkout(e.target.value)
              }}
            >
              <option disabled selected value></option>
              {workouts.map((workout, index) => {
                return (
                  <option key={index} value={workout.workout}>
                    {workout.workout}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            {results.length > 0 &&
              results.map((ex, ind) => {
                return (
                  <SingleExerciseInputs
                    ind={ind}
                    ex={ex}
                    key={ind}
                    results={results}
                    handleResultsInputs={handleResultsInputs}
                  />
                )
              })}
          </div>
          {!showResults && selectedWorkout === [] && <div>Loading</div>}
          <div className='btn-container'>
            <button
              className='send btn'
              onClick={(e) => {
                e.preventDefault()
                AddWorkout(
                  userDetail[0].email,
                  results,
                  workouts,
                  selectedWorkout
                )
                setResults([])
              }}
            >
              Send Workout
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default AddNewWorkout
