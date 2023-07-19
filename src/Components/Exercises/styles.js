import styled from 'styled-components'
import { mediaQueries } from '../../mediaQueries'
export const SAddExerciseContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 95vw;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  border-color: #ea4c89;
  margin: 0 20px 0 20px;
  justify-content: space-between;
`
export const SExercicesResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  ${mediaQueries('lg')`
  justify-content:center;`}
  ${mediaQueries('md')`
  justify-content:center;
  `}
  ${mediaQueries('sm')`
  `}
`

export const SAllInputs = styled.div`
  margin: 20px 0 20px 0;
  display: flex;
  flex-direction: row;
  flex-basis: 33%;

  ${mediaQueries('lg')`
  flex-basis:25%;
  `}
  ${mediaQueries('md')`
  flex-basis:50%;
  `}
  ${mediaQueries('sm')`
  flex-basis:100%;
  `}
`

export const SSingleInput = styled.div`
  padding: 0 20px 0 20px;
`

export const SExerciseInput = styled.input`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 75px;
  height: 25px;
  border-radius: 5px;
  border-width: 1px;
  ${mediaQueries('sm')`
  width:25px;
  `}
`

export const SExerciseInputContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SExerciseTitle = styled.p`
  margin: 0;
  width: 60px;
  font-weight: 700;
  display: flex;
  align-items: center;
`

export const SSingleRep = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 10px;
`
export const SSingleRepTitle = styled.div`
  font-weight: 700;
  margin: 5px 0 5px;
  display: flex;
  align-items: center;
`
export const SButton = styled.button`
  background-color: #ea4c89;
  border-radius: 5px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  height: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 2px 10px 2px 10px;
  list-style: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 80px;
`
export const SSelect = styled.select`
  border-radius: 5px;
  border-width: 1px;
  color: white;
  background-color: #ea4c89;
  margin-left: 5px;
  font-size: 1.6rem;
`
export const SWorkoutSelect = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  margin-top: 20px;
  margin-bottom: 20px;
`
export const SLoading = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2em;
  font-weight: 600;
`

export const SFormularButton = styled.button`
  background-color: #ea4c89;
  border-radius: 5px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  height: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  list-style: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 20px;
  padding: 20px;
`
export const SSelectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
