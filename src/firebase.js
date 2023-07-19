import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE)

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth()
export const db = getFirestore(app)

export const getFullWorkout = async (email) => {
  const WorkoutNamesRef = collection(db, 'Users', email, 'Workouts')
  let result = []
  const data = await getDocs(WorkoutNamesRef)
  data.docs.map((doc) => {
    result.push({ ...doc.data(), id: doc.id })
    return
  })
  return result
}

export const getLastSeanceByWorkout = async (
  workouts,
  selectedWorkout,
  email,
  date
) => {
  let intermediaryResult = []
  let finalResult = []

  for (const workout of workouts) {
    if (workout.workout === selectedWorkout && workout.setup === true) {
      for (const ex of workout.exercises) {
        const exerciseRef = collection(
          db,
          'Users',
          email,
          'Workouts',
          ex.exercise,
          'Seances'
        )
        const data = await getDocs(exerciseRef)

        const tempResult = data.docs.map((doc) => doc.data())

        let maxDate = 0

        for (const i in tempResult) {
          if (maxDate < tempResult[i].date.seconds) {
            maxDate = tempResult[i].date.seconds
          }
        }

        for (const exercise of tempResult) {
          if (exercise.date.seconds === maxDate) {
            intermediaryResult.push(exercise)
          }
        }
      }
      console.log('tempo', intermediaryResult)
    } else if (workout.workout === selectedWorkout && workout.setup === false) {
      workout.exercises.forEach((ex) => {
        intermediaryResult.push({
          date: date,
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
    }
  }

  intermediaryResult.forEach((exercice, index) => {
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
    } = exercice

    finalResult.push({
      date: date,
      exName: exName,
      rep1: rep1,
      rep2: rep2,
      rep3: rep3,
      weight1: weight1,
      weight2: weight2,
      weight3: weight3,
      success1: success1,
      success2: success2,
      success3: success3,
    })

    if (success1 && success2 && success3) {
      if (rep1 >= 12 && rep2 >= 12 && rep3 >= 12) {
        finalResult[index].weight1 = Number(weight1) + 5
        finalResult[index].weight2 = Number(weight2) + 5
        finalResult[index].weight3 = Number(weight3) + 5
        finalResult[index].rep1 = 8
        finalResult[index].rep2 = 8
        finalResult[index].rep3 = 8
        finalResult[index].success1 = null
        finalResult[index].success2 = null
        finalResult[index].success3 = null
      } else {
        finalResult[index].weight1 = Number(weight1)
        finalResult[index].weight2 = Number(weight2)
        finalResult[index].weight3 = Number(weight3)
        finalResult[index].rep1 = Number(rep1) + 1
        finalResult[index].rep2 = Number(rep2) + 1
        finalResult[index].rep3 = Number(rep3) + 1
        finalResult[index].success1 = null
        finalResult[index].success2 = null
        finalResult[index].success3 = null
      }
    } else if (!success1 || !success2 || !success3) {
      finalResult[index].exName = exName
      finalResult[index].rep1 = rep1
      finalResult[index].rep2 = rep2
      finalResult[index].rep3 = rep3
      finalResult[index].weight1 = Number(weight1)
      finalResult[index].weight2 = Number(weight2)
      finalResult[index].weight3 = Number(weight3)
      finalResult[index].success1 = null
      finalResult[index].success2 = null
      finalResult[index].success3 = null
    }
  })

  return finalResult
}

export const AddWorkout = (email, results, workouts, selectedWorkout) => {
  if (results.length === 0) {
    return new Error()
  }
  let error = 0
  results.map((ex, index) => {
    const {
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

    if (
      !rep1 ||
      !rep2 ||
      !rep3 ||
      !weight1 ||
      !weight2 ||
      !weight3 ||
      typeof success1 !== 'boolean' ||
      typeof success2 !== 'boolean' ||
      typeof success3 !== 'boolean'
    ) {
      error++
    }

    if (error > 0) {
      return
    }
  })
  if (error === 0) {
    workouts.map((workout) => {
      if (workout.workout === selectedWorkout && workout.setup === false) {
        const updateEntry = async () => {
          const projectDoc = doc(db, 'Users', email, 'Workouts', workout.id)
          const updated = { setup: true }
          await updateDoc(projectDoc, updated)
        }
        updateEntry()
      }
    })

    results.map((ex, index) => {
      const EntryRef = collection(
        db,
        'Users',
        email,
        'Workouts',
        ex.exName,
        'Seances'
      )

      const addWorkoutToDb = async () => {
        await addDoc(EntryRef, ex)
      }
      addWorkoutToDb()
    })
  }
}
export const createWorkoutInDb = (email, workout, exercise) => {
  let error = 0
  const workoutsRef = collection(db, 'Users', email, 'Workouts')
  const exerciseRef = collection(
    db,
    'Users',
    email,
    'Workouts',
    workout || ' ',
    'Exercises'
  )
  if (workout === '') {
    error++
  }

  exercise.map((ex) => {
    if (ex.exercise === '') {
      error++
    }
  })
  if (error > 0) {
    console.log(error)
  }
  if (error === 0) {
    const addWorkoutDb = async () => {
      await addDoc(workoutsRef, {
        workout: workout,
        exercises: exercise,
        setup: false,
      })
    }
    addWorkoutDb()
    const addExercisesDb = () => {
      exercise.map(async (ex) => {
        await addDoc(exerciseRef, {
          exercise: ex.exercise,
        })
      })
    }
    addExercisesDb()
  }
}
