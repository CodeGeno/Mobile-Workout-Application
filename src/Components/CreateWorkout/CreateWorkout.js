import { useContext, useState } from 'react'
import {
  SButton,
  SExerciseAndTitleInput,
  SInput,
  SNewWorkoutBackground,
  SNewWorkoutContainer,
  SNewWorkoutExercisesContainer,
  SNewWorkoutTitle,
  SSingleExercise,
  STitre,
  SUnderline,
  SWorkoutName,
  SWorkoutNameContainer,
} from './styles'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserContext } from '../Contexts/UserContext'
export const CreateWorkout = () => {
  const { userDetail, setUserDetail } = useContext(UserContext)

  const [newWorkoutTitle, setNewWorkoutTitle] = useState([
    {
      workout: 'a',
    },
  ])
  const [newExercise, setNewExercise] = useState([
    {
      exercise: '',
    },
  ])
  const workoutsRef = collection(db, 'Users', userDetail[0].email, 'Workouts')
  const exerciseRef = collection(
    db,
    'Users',
    userDetail[0].email,
    'Workouts',
    newWorkoutTitle[0].workout || ' ',
    'Exercises'
  )
  const addWorkoutDb = async () => {
    await addDoc(workoutsRef, {
      workout: newWorkoutTitle[0].workout,
      exercises: newExercise,
      setup: false,
    })
  }
  const addExercisesDb = async () => {
    newExercise.map(async (ex) => {
      await addDoc(exerciseRef, {
        exercise: ex.exercise,
      })
    })
  }
  const addToDb = () => {
    addWorkoutDb()
  }
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
      <SNewWorkoutBackground>
        <SNewWorkoutContainer>
          <SNewWorkoutTitle>Create a new Workout</SNewWorkoutTitle>

          <SUnderline />
          <SWorkoutNameContainer>
            <div>Workout Name :</div>
            <input
              type='text'
              onChange={(e) => {
                setNewWorkoutTitle([{ workout: e.target.value }])
                console.log(newWorkoutTitle)
              }}
            />
          </SWorkoutNameContainer>
          <SWorkoutName />

          <SUnderline></SUnderline>

          <SNewWorkoutExercisesContainer>
            {newExercise.map((Exercise, ind) => (
              <SSingleExercise key={ind}>
                <SExerciseAndTitleInput>
                  <STitre>Exercise{ind + 1}:</STitre>
                  <SInput
                    key={Exercise + ind}
                    type='text'
                    onChange={(e) => {
                      handleExercisesInputs(e, ind, 'exercise')
                      console.log(newExercise)
                    }}
                  />
                </SExerciseAndTitleInput>
              </SSingleExercise>
            ))}
          </SNewWorkoutExercisesContainer>
          <SButton onClick={() => addMore()}>Add More</SButton>
          <SButton onClick={() => addToDb()}>Save</SButton>
        </SNewWorkoutContainer>
      </SNewWorkoutBackground>
    </>
  )
}

/*  rep1: '',
        rep2: '',
        rep3: '',
        weight1: '',
        weight2: '',
        weight3: '',
        success1: '',
        success2: '',
        success3: '', */
