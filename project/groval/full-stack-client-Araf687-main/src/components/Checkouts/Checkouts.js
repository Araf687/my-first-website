import React, { useContext, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';


const useStyle=makeStyles(theme=>({
    root:{
        margin:'2% 10%',
    },
    form:{
        width:'90%',
        // border:'2px solid lightgrey',
        borderRadius:'10px',
        padding:'20px',
        boxShadow:'0 10px 15px 0 rgb(0 0 0 / 10%)',
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
    reviewProduct:{
        boxShadow:'0 10px 15px 0 rgb(0 0 0 / 5%)',
        borderRadius:'10px',
        padding: '20px !important',
        ['&  h3']:{margin:'0'},
    }

}))


const Checkouts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history=useHistory();
    const classes=useStyle();
    const [user,,cart,setCart]=useContext(UserContext);
    const totalPrice=cart.reduce((totalPrice,prd)=>totalPrice+prd.price*prd.quantity,0);
    const onSubmit = data =>{
        const {name,address,contact}=data;
        // console.log(name,address,contact);
        const items_id_qty= getDatabaseCart();
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const items={
            userId:user.email,
            products:items_id_qty,
            date:date,
            shippingDetails:{
                address:address,
                contact:contact
            },
            totalPrice:totalPrice,
        }
        console.log(items);
        fetch('http://localhost:5000/setOrders',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(items)
        })
        .then(res => res.json())
        .then(data =>{
            processOrder();
            
            setCart([]);
            console.log({message:'added succesfully',color:'Green'})

        })
        .catch(error=>{
            console.log({message:'something went wrong',color:'red'})
        })
        history.push('/orderHistory');
    }

    
    // console.log(totalPrice); 




    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4} style={{backgroundColor:'white'}}>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        < h3 style={{textAlign:'center'}}>Shipping Details</ h3>
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
                                label="Address"
                                type="text"
                                autoComplete="current-password"
                                {...register("address", { required: true })}
                            /> <br />
                            {/* errors will return when field validation fails  */}
                            {errors.email && <span>This field is required</span>} <br />

                            <TextField 
                                className={classes.input}
                                label="Contact Number"
                                type="text"
                                autoComplete="current-password"
                                {...register("contact", { required: true })}
                                /> <br />
                                {/* errors will return when field validation fails  */}
                                {errors.pass && <span>This field is required</span>}
                            <br /> 
                        
                        <input className={classes.btnSubmit} type="submit" value="Checkout"/>
                    </form>
                </Grid >
                <Grid item lg={8} className={classes.reviewProduct}>
                    <Grid container style={{margin:'10px 0px',color:'#999999'}}>
                        <Grid item lg={5}><  h3> Name</  h3></Grid>
                        <Grid item lg={2} style={{textAlign:'center'}}><  h3>Quantity</  h3></Grid>
                        <Grid item lg={2} style={{textAlign:'center'}}><  h3 >Price</  h3></Grid>
                        <Grid item lg={2} style={{textAlign:'center'}}><  h3 >Subtotal</  h3></Grid>
                        
                    </Grid>
                    <hr/>
                    {/* {cart.length && cart.map()} */}
                    {cart[0] && cart.map(pd=><ReviewProduct key={pd._id} product={pd}></ReviewProduct>)}
                    <hr />
                    <Grid container style={{padding:'5px'}}>
                        <Grid item lg={8}><strong>Total</strong></Grid>
                        <Grid item lg style={{textAlign:'center'}}><strong> {totalPrice}</strong> </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Checkouts;