import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import {
    Link
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import google from '../../icons/google.png'
import firebaseConfig from '../firebase.config';

const useStyle=makeStyles(theme=>({
    root:{
        width:'30%',
        margin:'3% 30%',
    },
    form:{
        padding:'40px',
        width:'100%',
        border:'2px solid black',
        
        ['& h3']:{
            marginTop:'0'
        }
    },
    input:{
        width:'100%',
    },
    btnSubmit:{
        width:'100%',
        fontSize:'15px',
        fontWeight:'600',
        border:'none',
        borderRadius:'5px',
        padding:'5px',
        height:'35px',
        backgroundColor:'#f50057',
        color:'white',
    },
    socialIcon:{
        width:'35px',
        margin:'3px 0px 0px 2px',
    },
    socialButtons:{
        border:'2px solid lightgrey',
        borderRadius:'20px',
        cursor:'pointer',
        margin:'20px 40px'
    }

}))

firebase.initializeApp(firebaseConfig);

const SignUp = () => {
    const { register, handleSubmit,formState: { errors } } = useForm();
    const classes=useStyle();
    const [confirmation,setConfirmation]=useState({});

    const onSubmit = data =>{
        
        const {email,pass,confirmPass}=data;
        console.log(email,pass,confirmPass);
        const valid=checkValidMailPass(email,pass,confirmPass);
        
        if(valid){
            firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in 
                // var user = userCredential.user;
                setConfirmation({message:'account created successfully',color:'green'})
            })
            .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                setConfirmation({message:errorMessage,color:'red'})
                // ..
            });
        }
        else{
            setConfirmation({message:"invalid email or password",color:'red'})
        }
    }
    
    const checkValidMailPass=(email,pass,confirmPass)=>{
        const password=pass.length>6 && pass===confirmPass;

        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && password)
        {
            return (true)
        }
        else{
            console.log(false)
            return (false)

        }
            

    }
    const handleGoogleLogIn=()=>{
        // console.log('handle google sign up');
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    // var credential = result.credential;
    // var token = credential.accessToken;
    // var user = result.user;
    console.log('success')
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
    // var email = error.email;
    // var credential = error.credential;
    console.log(errorMessage);
    // ...
  });
    }
    return (
        <div className={classes.root}>
            
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Sign Up</h3>
                <div>
                    <TextField
                        className={classes.input}
                        label="Name"
                        type="text"
                        autoComplete="current-password"
                        {...register("name", { required: true })}
                    /> <br />
                    {/* errors will return when field validation fails  */}
                    {errors.email && <span>This field is required</span>} <br />

                    <TextField
                        className={classes.input}
                        label="Email"
                        type="text"
                        autoComplete="current-password"
                        {...register("email", { required: true })}
                    /> <br />
                    {/* errors will return when field validation fails  */}
                    {errors.email && <span>This field is required</span>} <br />

                    <TextField 
                        className={classes.input}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        {...register("pass", { required: true })}
                        /> <br />
                        {/* errors will return when field validation fails  */}
                        {errors.pass && <span>This field is required</span>}
                     <br /> 
                     <TextField
                        className={classes.input}
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        {...register("confirmPass", { required: true })}
                    /> <br />
                    {/* errors will return when field validation fails  */}
                    {errors.pass && <span>This field is required</span>}
                     <br /> 
                </div>
                
                <input className={classes.btnSubmit} type="submit" />
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                        <p>Already have account?<Link to='/login'><strong>Login</strong></Link></p>
                    </Grid>
                    <Grid item xs></Grid>

                </Grid>
            </form>
            {confirmation.message &&   <p style={{color:confirmation.color}}>{confirmation.message}</p>}
            
            <Grid onClick={handleGoogleLogIn} container className={classes.socialButtons}>
                <Grid item xs={4} ><img className={classes.socialIcon} src={google} alt="" /></Grid>
                <Grid item><p style={{margin:'10px'}}>Continue with Google</p></Grid>
            </Grid>
            
            
        </div>
    );
};

export default SignUp;