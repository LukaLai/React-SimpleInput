import { useRef, useState, useEffect } from 'react'

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [nameState, setNameState] = useState('default')
  const [nameIsValid, setNameIsValid] = useState(false)
  const [nameIsTouched, setNameIsTouched] = useState(false)

  useEffect(()=>{
      if (nameIsValid) console.log('name is Valid')
  }, [nameIsValid])

  const nameChangeHandler = (e) => {
    setNameState(e.target.value)
  }

  const nameBlurHandler = (e) => {
    setNameIsTouched(true);

    if(nameState.trim() === '') {
      setNameIsValid(false)
      return;
    }

  }

  const formSubmissionHandler = (event) => {
    event.preventDefault()
    setNameIsTouched(true);

    if(nameState.trim() === '') {
      setNameIsValid(false)
      return;
    }
    setNameIsValid(true);


    // .... traitement exemple: requete POST

    
    setNameState('');
  }


  const nameInputIsinvalid = !nameIsValid &&  nameIsTouched;
  const nameInputClasses = nameInputIsinvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        value={nameState}
        onChange={nameChangeHandler} 
        onBlur={nameBlurHandler}
        type='text' 
        id='name' />

        {nameInputIsinvalid && (
          <p className='error-text'>Name cannot be empty</p>
        )}

      </div>
      <div className="form-actions">
        <button >Submit</button>
      </div>

      {nameState}
    </form>
  );
};

export default SimpleInput;
