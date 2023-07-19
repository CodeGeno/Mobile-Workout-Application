import Wrapper from './Components/Menu/MenuWrapper'
import { NavLink } from 'react-router-dom'
export const Menu = () => {
  return (
    <>
      <Wrapper>
        <div className='app-container form'>
          <NavLink className='btn' to='/addWorkout'>
            Add workouts
          </NavLink>
          <NavLink to='/createWorkout' className='btn'>
            Create workout
          </NavLink>
        </div>
      </Wrapper>
    </>
  )
}
