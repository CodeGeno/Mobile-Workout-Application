import styled from 'styled-components'

const Wrapper = styled.div`
  .form {
    padding: 1rem;
  }
  .workout-select-section {
    margin: 2rem 0;
  }
  h1 {
    font-weight: 800;
    font-size: 2rem;
  }
  .btn-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .form-input {
    margin: 0.2rem 0;
  }
  .btn {
    margin: 0.5rem;
    width: 5rem;
  }
  .disabled {
    background-color: lightgray;
  }
  .exercise-name {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 2rem 0 0 0;
    h2 {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
  .send {
    margin: 2rem 0;
    font-size: 2rem;
    width: unset;
  }
  .row {
    display: flex;
    label {
      width: 100px;
    }
  }
`

export default Wrapper
