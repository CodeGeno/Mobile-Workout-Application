import styled from 'styled-components'
import { mediaQueries } from '../../mediaQueries'
export const SNewWorkoutBackground = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  ${mediaQueries('lg')`
  ;

 `}
`
// background-color: #ea4c89;

export const SNewWorkoutContainer = styled.div`
  width: 80vw;
  border-style: solid;
  display: flex;
  flex-direction: column;
  color: black;
  font-weight: 700;
  padding: 20px;
  border-radius: 30px;
  border-color: #ea4c89;
  margin-top: 20px;
`
export const SNewWorkoutTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-weight: 700;
  margin-bottom: 10px;
  ${mediaQueries('lg')`
  font-size:1.6em;`}
`

export const SWorkoutExercisesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
export const SNewWorkoutExercisesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
  margin: 20px;
  ${mediaQueries('md')`
    justify-content: center;
`}
`
export const SSingleExercise = styled.div`
  color: white;
  flex-basis: 25%;
  ${mediaQueries('lg')`
  flex-basis:50%;`}
`
export const SExerciseAndTitleInput = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  border-style: solid;
  border-width: 1px;
  border-color: #ea4c89;
  background-color: #ea4c89;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`
export const STitre = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
`
export const SInput = styled.input`
  background-color: white;
  font-weight: 600;
`
export const SUnderline = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ea4c89;
`
export const SWorkoutNameContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`
export const SWorkoutName = styled.div``

export const SButton = styled.button`
  background-color: #ea4c89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 10px;
  list-style: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 1em;
  margin-bottom: 20px;
`
