function FormRow({ type, value, handleChange, name, labelText }) {
  return (
    <div className='login'>
      <label className='form-label' htmlFor='pwd'>
        {labelText || name}
      </label>
      <input
        className='form-input'
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
export default FormRow
