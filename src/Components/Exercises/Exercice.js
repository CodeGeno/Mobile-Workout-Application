import React, { useState, useContext } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import Calendar from '../../Calendar'
import { UserContext } from '../Contexts/UserContext'
import {
  db,
  getFullWorkout,
  getLastSeanceByWorkout,
  getWorkoutSetup,
} from '../../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import {
  SAddExerciseContainer,
  SAllInputs,
  SButton,
  SExercicesResultContainer,
  SExerciseInput,
  SExerciseTitle,
  SFlexContainer,
  SSelect,
  SSingleInput,
  SSingleRep,
  SSingleRepTitle,
  SWorkoutSelect,
} from './styles'
import { useEffect } from 'react'
//local storage

function Exercice() {
  const [test, setTest] = useState('')
  const [intermediaryRes, setIntermediaryRes] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [showCalendar, setShowCalendar] = useState(true)
  const { userDetail, setUserDetail } = useContext(UserContext)
  const [selectedWorkout, setSelectedWorkout] = useState([])
  const [results, setResults] = useState([])
  const [workoutIndex, setWorkoutIndex] = useState(null)
  const [firstWorkout, setFirstWorkout] = useState()
  //Fetch Workouts
  //
  const workoutsRef = collection(db, 'Users', userDetail[0].email, 'Workouts')
  const updateEntry = async (id, value) => {
    const projectDoc = doc(db, 'Users', userDetail[0].email, 'Workouts', id)
    const updated = { setup: value }
    await updateDoc(projectDoc, updated)
  }

  const date = new Date()
  const today = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  )

  const getLastWorkout = () => {
    let tempResult = []
    let finalResult = []

    workouts.map((w) => {
      if (w.workout === selectedWorkout && w.setup === true) {
        w.exercises.forEach(async (ex) => {
          const exerciseRef = collection(
            db,
            'Users',
            userDetail[0].email,
            'Workouts',
            ex.exercise,
            'Seances'
          )
          const data = await getDocs(exerciseRef)

          data.docs.map((doc) => {
            tempResult.push({ ...doc.data() })
          })

          if (tempResult.length === w.exercises.length * data.docs.length) {
            let maxDate = 0
            tempResult.map((exo) => {
              if (maxDate < exo.date.seconds) {
                maxDate = exo.date.seconds
              }
            })
            tempResult.map((exerci) => {
              if (exerci.date.seconds === maxDate) {
                finalResult.push(exerci)
              }
            })
            setIntermediaryRes(finalResult)
          }
        })
      }
    })

    var temporaryResult = results
    intermediaryRes.map((exer, index) => {
      const {
        exName,
        rep1,
        rep2,
        rep3,
        weight1,
        weight2,
        weight3,
        success1,
        success2,
        success3,
      } = exer
      temporaryResult[index].exName = exName
      temporaryResult[index].rep1 = rep1
      temporaryResult[index].rep2 = rep2
      temporaryResult[index].rep3 = rep3
      temporaryResult[index].weight1 = weight1
      temporaryResult[index].weight2 = weight2
      temporaryResult[index].weight3 = weight3
      temporaryResult[index].prevSuccess1 = success1
      temporaryResult[index].prevSuccess2 = success2
      temporaryResult[index].prevSuccess3 = success3
    })
    setResults(temporaryResult)
  }

  const lastResultsSetup = () => {
    var tempResult = results
    intermediaryRes.map((ex, index) => {
      const {
        exName,
        rep1,
        rep2,
        rep3,
        weight1,
        weight2,
        weight3,
        success1,
        success2,
        success3,
      } = ex
      tempResult[index].exName = exName
      tempResult[index].rep1 = rep1
      tempResult[index].rep2 = rep2
      tempResult[index].rep3 = rep3
      tempResult[index].weight1 = weight1
      tempResult[index].weight2 = weight2
      tempResult[index].weight3 = weight3
      tempResult[index].prevSuccess1 = success1
      tempResult[index].prevSuccess2 = success2
      tempResult[index].prevSuccess3 = success3
    })
    setResults(tempResult)
  }

  const resultsSetup = async () => {
    let proj = []

    workouts.forEach((w) => {
      if (!w.workout.setup) {
        if (w.workout === selectedWorkout) {
          w.exercises.forEach((ex) => {
            proj.push({
              date: today,
              exName: ex.exercise,
              rep1: '',
              rep2: '',
              rep3: '',
              weight1: '',
              weight2: '',
              weight3: '',
              success1: null,
              success2: null,
              success3: null,
            })
          })
          return setResults(proj)
        }
      }
    })
  }

  const handleResultsInputs = (e, ind, exName) => {
    if (e === true) {
      const value = e
      const result = [...results]
      result[ind][exName] = value
      setResults(result)
      return
    }
    if (typeof e.target.value === ('string' || 'number')) {
      const value = e.target.value
      const result = [...results]
      result[ind][exName] = value
      setResults(result)
    }
  }
  const AddWorkout = async () => {
    results.map((ex, index) => {
      const EntryRef = collection(
        db,
        'Users',
        userDetail[0].email,
        'Workouts',
        ex.exName,
        'Seances'
      )
      const test = async () => {
        await addDoc(EntryRef, ex)
      }
      test()
    })
  }

  useEffect(() => {
    getFullWorkout(userDetail[0].email).then((data) => {
      setWorkouts(data)
    })
  }, [])
  useEffect(() => {
    getFullWorkout(userDetail[0].email).then((data) => {})

    getLastSeanceByWorkout(workouts, selectedWorkout, userDetail[0].email).then(
      (deta) => console.log('UlTiMatE DatA', deta)
    )
    let theData = getLastSeanceByWorkout(
      workouts,
      selectedWorkout,
      userDetail[0].email
    )
    let resulta = theData.then((data) => console.log('dataLLLL', data))
    console.log('the Data', theData)
  }, [workouts])

  return (
    <>
      {false && showCalendar && <Calendar />}
      <SAddExerciseContainer>
        <SWorkoutSelect>
          <label htmlFor='Workout'>Choose a workout:</label>
          <SSelect
            name='workout'
            onChange={(e) => {
              setSelectedWorkout(e.target.value)
              getLastSeanceByWorkout(
                workouts,
                selectedWorkout,
                userDetail[0].email
              ).then((daata) => console.log('DADATA', daata))
            }}
          >
            <option></option>
            {workouts.map((workout, index) => {
              return (
                <option keyy={index} value={workout.workout}>
                  {workout.workout}
                </option>
              )
            })}
          </SSelect>
        </SWorkoutSelect>
        <SFlexContainer>
          {results &&
            results.map((ex, ind) => {
              return (
                <>
                  <SExercicesResultContainer key={ind * ind}>
                    <SAllInputs>
                      <SSingleInput>
                        <SSingleRepTitle>Exercise: {ex.exName}</SSingleRepTitle>
                        <SSingleRep>
                          <SExerciseTitle>Rep1:</SExerciseTitle>
                          <SExerciseInput
                            placeholder='weight'
                            value={results[ind].weight1}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'weight1')
                            }}
                          />
                          <SExerciseInput
                            placeholder='reps'
                            value={results[ind].rep1}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'rep1')
                            }}
                          />
                          <SButton
                            onClick={() => {
                              handleResultsInputs(true, ind, 'success1')
                            }}
                          >
                            success
                          </SButton>
                        </SSingleRep>

                        <SSingleRep>
                          <SExerciseTitle>Rep2:</SExerciseTitle>
                          <SExerciseInput
                            placeholder='weight'
                            value={results[ind].weight2}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'weight2')
                            }}
                          />
                          <SExerciseInput
                            placeholder='reps'
                            value={results[ind].rep2}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'rep2')
                            }}
                          />
                          <SButton
                            onClick={() => {
                              handleResultsInputs(true, ind, 'success2')
                            }}
                          >
                            success
                          </SButton>
                        </SSingleRep>

                        <SSingleRep>
                          <SExerciseTitle>Rep3:</SExerciseTitle>
                          <SExerciseInput
                            placeholder='weight'
                            value={results[ind].weight3}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'weight3')
                            }}
                          />
                          <SExerciseInput
                            placeholder='reps'
                            value={results[ind].rep3}
                            onChange={(e) => {
                              handleResultsInputs(e, ind, 'rep3')
                            }}
                          />
                          <SButton
                            onClick={() => {
                              handleResultsInputs(true, ind, 'success3')
                            }}
                          >
                            success
                          </SButton>
                        </SSingleRep>
                      </SSingleInput>
                    </SAllInputs>
                  </SExercicesResultContainer>
                </>
              )
            })}
        </SFlexContainer>

        <button
          onClick={() => {
            resultsSetup()
            //AddWorkout()

            // lastResultsSetup()
          }}
        >
          aaaa
        </button>
        <button onClick={() => console.log('workouts:::', workouts)}>
          CLG RESULTS
        </button>
        <div>{test}</div>
      </SAddExerciseContainer>
    </>
  )
}

export default Exercice
