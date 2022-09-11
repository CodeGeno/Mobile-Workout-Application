import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { clear } from '@testing-library/user-event/dist/clear'

const firebaseConfig = {
  apiKey: 'AIzaSyCvP5XQ_AbfMzJCa8o4t7w7s5zDPadq2YY',
  authDomain: 'workout3-fa4e0.firebaseapp.com',
  projectId: 'workout3-fa4e0',
  storageBucket: 'workout3-fa4e0.appspot.com',
  messagingSenderId: '844931470348',
  appId: '1:844931470348:web:38eda64d8a92a0ed364a29',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth()
export const db = getFirestore(app)

export const getFullWorkout = async (email) => {
  const WorkoutNamesRef = collection(db, 'Users', email, 'Workouts')
  const data = await getDocs(WorkoutNamesRef)
  const result = data.docs.map((doc) => doc.data())
  return result
}

export const getWorkoutSetup = async (
  workouts,
  selectedWorkout,
  email,
  exercise
) => {
  const WorkoutNamesRef = collection(db, 'Users', email, 'Workouts')
  const data = await getDocs(WorkoutNamesRef)
  const result = data.docs.map((doc) => doc.data()['setup'])
  return result
}
export const getLastSeanceByWorkout = async (
  workouts,
  selectedWorkout,
  email
) => {
  let tempResult = []
  let intermediaryResult = []
  return workouts.map((workout) => {
    if (workout.workout === selectedWorkout && workout.setup === true) {
      return workout.exercises.forEach(async (ex) => {
        const exerciseRef = collection(
          db,
          'Users',
          email,
          'Workouts',
          ex.exercise,
          'Seances'
        )
        const data = await getDocs(exerciseRef)

        data.docs.map((doc) => {
          tempResult.push({ ...doc.data() })
        })

        if (tempResult.length === workout.exercises.length * data.docs.length) {
          let maxDate = 0
          tempResult.map((exo) => {
            if (maxDate < exo.date.seconds) {
              maxDate = exo.date.seconds
            }
          })
          tempResult.map((exerci) => {
            if (exerci.date.seconds === maxDate) {
              intermediaryResult.push(exerci)
            }
          })
        }
      })
    }
    console.log('interm', intermediaryResult)
    return intermediaryResult
  })
}
export const getSeance = () => {}
