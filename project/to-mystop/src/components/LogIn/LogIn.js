import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from '../firebase.config';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa";
import './LogIn.css';


const LogIn = () => {
    const [validationMessage, setValidationMessage]=useState({});
    const [newUser,setNewUser]=useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>
    {
        if(newUser)
        {
            const {email,name,password,confirmPassword}=data;
            if(password===confirmPassword)
            {
                console.log(data,email,password,name);
                handleCreateUser(email,password);
            }
            else{
                const errorMessage='passwords are not same'
                 setValidationMessage(errorMessage);
            }
        }
        else{
            const {email,password}=data;
            console.log(data,email,password);
            logInWithEmailPass(email,password);
          

        }
    }

    const history=useHistory();
    const location=useLocation();
    let { from } = location.state || { from: { pathname: "/destination/car" } };
    const [,setLoggedInUser]=useContext(UserContext);
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn=()=>
    {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const {displayName,email} = result.user
            const signedInUser={name:displayName,email:email};
            console.log(displayName,email);
            setLoggedInUser(signedInUser);
            history.replace(from)
        }).catch((error) => {
            var errorMessage = error.message;
            setValidationMessage({message:errorMessage,color:'red'});
        });

    }
    const handleCreateUser=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
            const message='Account created successfully'
            setValidationMessage({message:message,color:'green'});
            // ...
        })
        .catch((error) => {
            var errorMessage = error.message;
             setValidationMessage({message:errorMessage,color:'red'});
            // ..
        });
    }
    const logInWithEmailPass=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const signedInUser={email:email,password:password};
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
        .catch((error) => {
            var errorMessage = error.message;
             setValidationMessage({message:errorMessage,color:'red'});
        });

    }
    return (
        <div className='login container'>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>

                { newUser===false && 
                  <div>
                        <h3>Log In</h3>
                        <input {...register("email", { required: true })} placeholder='Email' />
                        {errors.email && <span className="error"> <small>This field is required</small></span>}
                        <input type='password' {...register("password", { required: true })} placeholder='Password' />
                        {errors.password && <span className="error"><small>This field is required</small></span>}
                        <div className='remember-pass'>
                            <label><input type="checkbox"/><small>Remember me</small></label>
                            <label> <small className='highlighted-text'> Forgot Password</small></label>
                        </div>
                        <input type="submit" className='bttn-submit' />
                        <label><small>Don't have an account </small><small onClick={()=>{setNewUser(!newUser)}} className='highlighted-text'>Create account</small></label>
                  </div>
                }
                { newUser===true && 
                  <div>
                    <h3>Create Account</h3>
                    <input {...register("name")} placeholder='Your Name' /> <br/>
                    <input {...register("email", { required: true })} placeholder='Username or Email' />  
                    {errors.email && <span className="error">This field is required</span>}<br/>
                    <input type='password' {...register("password", { required: true })} placeholder='Password' /> 
                    {errors.password && <span className="error">This field is required</span>}<br/>
                    <input type='password' {...register("confirmPassword", { required: true })} placeholder='Confirm Password' />
                    {errors.confirmPassword && <span className="error">This field is required</span>}<br/>
                    <input type="submit" className='bttn-submit' />
                    <label><small>Already have an account?</small><small onClick={()=>{setNewUser(!newUser)}} className='highlighted-text'>Login</small></label>
                  </div> 
                }

            </form>
            <p style={{color:validationMessage.color,margin:'0'}}><small>{validationMessage.message}</small></p>
            <button className='bttn' onClick={handleGoogleSignIn}> <span style={{float:'left'}}><FaGoogle/></span>Continue with Google</button>
        </div>
    );
};

export default LogIn;