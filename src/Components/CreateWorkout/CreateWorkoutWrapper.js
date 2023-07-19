import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  .form {
  }
  h1 {
    font-size: 2rem;
    font-weight: 800;
  }
  .form-label {
    font-size: 1.2rem;
  }
  .btn-container {
    width: 100%;
    margin: 2rem 0;
    display: flex;
    justify-content: space-evenly;
    .btn {
      padding: 1rem 0rem;
      width: 6rem;
    }
  }
  .single-ex {
    margin: 0.5rem 0;
  }
`

export default Wrapper
