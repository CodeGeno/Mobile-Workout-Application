function SingleExerciseInputs({ ind, ex, results, handleResultsInputs }) {
  return (
    <>
      <div key={ind * ind}>
        <div>
          <div className='exercise-name'>
            <h2>Exercise: {ex.exName}</h2>
          </div>
          <div>
            <div>Set 1:</div>
            <div className='row'>
              <label>Weight :</label>
              <input
                className='form-input'
                type='number'
                placeholder='Weight'
                value={results[ind].weight1}
                onChange={(e) => {
                  handleResultsInputs(e, ind, 'weight1')
                }}
              />
            </div>
            <div className='row'>
              <label>Reps :</label>
              <input
                className='form-input'
                type='number'
                placeholder='Repetition'
                value={results[ind].rep1}
                onChange={(e) => {
                  handleResultsInputs(e, ind, 'rep1')
                }}
              />
            </div>
            <div className='btn-container'>
              <button
                className={
                  results[ind].success1 === true ? 'btn' : 'disabled btn'
                }
                onClick={() => {
                  handleResultsInputs(true, ind, 'success1')
                }}
              >
                success
              </button>
              <button
                className={
                  results[ind].success1 === false ? 'btn' : 'disabled btn'
                }
                onClick={() => {
                  handleResultsInputs(false, ind, 'success1')
                }}
              >
                fail
              </button>
            </div>
          </div>

          <div>
            <div>Set 2:</div>
            <div className='row'>
              <label>Weight :</label>
              <input
                className='form-input'
                type='number'
                placeholder='Weight'
                value={results[ind].weight2}
                onChange={(e) => {
                  handleResultsInputs(e, ind, 'weight2')
                }}
              />
            </div>
            <div className='row'>
              <label>Reps :</label>
              <input
                className='form-input'
                type='number'
                placeholder='Repetition'
                value={results[ind].rep2}
                onChange={(e) => {
                  handleResultsInputs(e, ind, 'rep2')
                }}
              />
            </div>
            <div className='btn-container'>
              <button
                className={
                  results[ind].success2 === true ? 'btn' : 'disabled btn'
                }
                onClick={() => {
                  handleResultsInputs(true, ind, 'success2')
                }}
              >
                success
              </button>
              <button
                className={
                  results[ind].success2 === false ? 'btn' : 'disabled btn'
                }
                onClick={() => {
                  handleResultsInputs(false, ind, 'success2')
                }}
              >
                fail
              </button>
            </div>
          </div>
        </div>

        <div>
          <div>Set 3:</div>
          <div className='row'>
            <label>Weight :</label>
            <input
              className='form-input'
              type='number'
              placeholder='Weight'
              value={results[ind].weight3}
              onChange={(e) => {
                handleResultsInputs(e, ind, 'weight3')
              }}
            />
          </div>
          <div className='row'>
            <label>Reps :</label>
            <input
              className='form-input'
              type='number'
              placeholder='Repetition'
              value={results[ind].rep3}
              onChange={(e) => {
                handleResultsInputs(e, ind, 'rep3')
              }}
            />
          </div>
          <div className='btn-container'>
            <button
              className={
                results[ind].success3 === true ? 'btn' : 'disabled btn'
              }
              onClick={() => {
                handleResultsInputs(true, ind, 'success3')
              }}
            >
              success
            </button>
            <button
              className={
                results[ind].success3 === false ? 'btn' : 'disabled btn'
              }
              onClick={() => {
                handleResultsInputs(false, ind, 'success3')
              }}
            >
              fail
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default SingleExerciseInputs
