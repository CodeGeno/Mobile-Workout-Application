import { NavLink } from 'react-router-dom'
import Wrapper from './HomeButtonWrapper'

function HomeButton() {
  return (
    <Wrapper>
      <NavLink className='home send btn' to='/Menu'>
        Home
      </NavLink>
    </Wrapper>
  )
}
export default HomeButton
