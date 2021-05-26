import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import google from '../../icons/google.png'
import {
    Link, useHistory, useLocation
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';

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
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user,setUser]=useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const classes=useStyle();
    const history=useHistory();
    const location=useLocation();
     
    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data =>{
        const {email,pass}=data;
        console.log(email,pass);
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // var user = userCredential.user;
            const userDetails={
                email:email, 
            }
            setUser(userDetails);
            history.replace(from);
            console.log('success');
        })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    const handleGoogleLogIn=()=>{
        // console.log('handle google sign up');
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            // var credential = result.credential;
            // var token = credential.accessToken;
            const user = result.user;
            const {email,displayName,photoURL}=user
            const userDetails={
                email:email,
                name:displayName,
                image:photoURL
            }
            
            // console.log('success',email,displayName,photoURL);
            setUser(userDetails);
            history.replace(from);
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
                <h3>Log In</h3>
                <div>
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
                    <Grid container>
                        <Grid>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                // inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> 
                        </Grid>
                        <Grid item style={{paddingTop:'10px'}}><strong>Remember me</strong></Grid>
                        <Grid item xs></Grid>
                        <Grid style={{paddingTop:'10px'}}><Link to='#'><strong>Forgot Password</strong> </Link></Grid>
                    </Grid>
                     <br /> 
                </div>
                
                <input className={classes.btnSubmit} type="submit" />
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                        <p>Do you have an account?<Link to='/signUp'><strong>Create Account</strong></Link></p>
                    </Grid>
                    <Grid item xs></Grid>

                </Grid>
            </form>
            
            <Grid onClick={handleGoogleLogIn} container className={classes.socialButtons}>
                <Grid item xs={4} ><img className={classes.socialIcon} src={google} alt="" /></Grid>
                <Grid item xs><p style={{margin:'10px'}}>Continue with Google</p></Grid>
            </Grid>
            
        </div>
    );
};

export default Login;