import { useState } from 'react'; 
import useInput from '../hooks/UseInput.js'; 

const SimpleInput2 = (props) => { 

  const { 
    value: enteredName, 
    isValid: enteredNameIsValid, 
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler, 
    reset: resetNameInput 

  } = useInput(value => value.trim() !== ''); 

  const [enteredEmail, setEnteredEmail] = useState(''); // Hook useState
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false); 
  const enteredEmailIsValid = enteredEmail.includes('@'); 
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched; 
  let formIsValid = false;  

  if (enteredNameIsValid && enteredEmailIsValid) { // Valide le formulaire si name <> '' et si mail contient @
    formIsValid = true; 
  } 

  const emailInputChangeHandler = (event) => { // Fonction recupere la valeur du champ a chaque modif
    setEnteredEmail(event.target.value); 
  }; 

  const emailInputBlurHandler = (event) => { // Fonction sortie du champ email si 
    setEnteredEmailTouched(true); //Envoie bool vrai champ email touché
  }; 

  const formSubmissionHandler = (event) => { //fonction submit form
    event.preventDefault(); // recupere event
    if (!enteredNameIsValid) { 
      return; 
    } 
    console.log(enteredName); 
    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM 
    resetNameInput(); // met à vide le champ name
    setEnteredEmail(''); // hook usestate qui met caractere vide champ email
    setEnteredEmailTouched(false); // reinitialise bool
  }; 

  const nameInputClasses = nameInputHasError 
    ? 'form-control invalid' 
    : 'form-control'; 

  const emailInputClasses = enteredEmailIsInvalid 
    ? 'form-control invalid' 
    : 'form-control'; 

  return ( 

    <form onSubmit={formSubmissionHandler}> {/* fonction submit */}
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label> 
        <input 
          type='text' 
          id='name' 
          onChange={nameChangedHandler} 
          onBlur={nameBlurHandler} 
          value={enteredName} 
        /> 
        {nameInputHasError && ( 
          <p className='error-text'>Name must not be empty.</p> 
        )} 
      </div> 
      <div className={emailInputClasses}> 
        <label htmlFor='email'>Your E-Mail</label> 
        <input 
          type='email' 
          id='email' 
          onChange={emailInputChangeHandler} 
          onBlur={emailInputBlurHandler} 
          value={enteredEmail} 
        /> 
        {enteredEmailIsInvalid && ( 
          <p className='error-text'>Please enter a valid email.</p> 
        )} 
      </div> 
      <div className='form-actions'> 
        <button disabled={!formIsValid}>Submit</button> 
      </div> 
    </form> 
  ); 
}; 

export default SimpleInput2; 
