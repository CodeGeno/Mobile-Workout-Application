import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #f0f4f8;
  display: flex;
  justify-content: center;
  height: 100vh;
  .app-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .btn {
      font-size: 2rem;
      display: flex;
      justify-content: center;
    }
  }
`

export default Wrapper
