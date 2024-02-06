import React, { useState,useEffect,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Authcontext from '../../store/auth-context';
import Input from '../UI/Input/Input';


const emailReducer=(state,action) =>{
  if(action.type==='USER_INPUT'){
    return {value:action.val ,isValid:action.val.includes('@')}
  }

  if(action.type==='INPUT_BLUR'){
    
    return {value:state.value ,isValid:state.value.includes('@')}
  }
  console.log(state.value)
  return {value:'' ,isValid:false}
}

const Login = (props) => {
  
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState,dispatchEmail]=useReducer(emailReducer,{
    value:'' ,
    isValid:null});

  useEffect(()=>{
        console.log('EFFECT RUNNING')
        return ()=>{
      console.log('EFFECT CLEANUP')
    }
  
  },[]);

  // useEffect(()=>{

  //   const identifier=setTimeout(()=>{
  //     console.log('Checking Form Validity')
    
  //   },500);

  //   return ()=>{
  //     console.log('CLEANUP')
  //     clearTimeout(identifier);
  //   }
  
  // },[enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {

      dispatchEmail({type:'USER_INPUT',val:event.target.value});
      setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
    
  };

  const passwordChangeHandler = (event) => {
      setFormIsValid(
      emailState.isValid && enteredPassword.trim().length > 6
    );
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
 
  const ctx=useContext(Authcontext);
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
       />
          <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
       />
       
        <div className={classes.actions}>
          <Button type="submit"  className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
