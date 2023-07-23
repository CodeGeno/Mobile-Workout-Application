import styled from 'styled-components'

const Wrapper = styled.div`
  .form {
    border-top-color: var(--primary-500);
    border-top-style: solid;
    border-top-width: 10px;
    font-size: 1.4rem;
  }
  .success {
    background-color: green;
  }
  .danger {
    margin: 1rem 0;
    padding: 0.5 0rem;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 109, 109, 0.8);
    border-radius: 10px;
    color: white;
  }
  .login {
  }
  .login-btn-container {
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0 0 0;
  }
`

export default Wrapper
