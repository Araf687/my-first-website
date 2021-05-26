import {  Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const useStyle=makeStyles(theme=>({
    addSection:{
        backgroundColor:'white',
        borderRadius:'10px',
    },

    inputSection:{
        padding:'15px',
        
        ['& input']:{
            width:'250px',
            height:'25px',
            borderRadius:'5px',
            border:'1px solid lightgrey'

        },
        ['& label']:{
            height:'60px',
            width:'250px',
            borderRadius:'5px',
            border:'1px solid lightgrey'
        }
    },
    btnSubmit:{
        width:'150px',
        height:'30px',
        backgroundColor:"#ffcc00",
        border:'1px solid #ffcc00',
        margin:"5px 0px",
        borderRadius:'5px',
        fontWeight:'600',
        fontSize:'15px'

    }
}))

const AddProduct = () => {
    const classes=useStyle();
    const [confirmation,setConfirmation]=useState({});

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
            setConfirmation({});
            const {productName, weight, price, img} = data;
            const imageData=new FormData();
            imageData.set('key', '9119b84dd18ee57efb3709cc88cff795');
            imageData.append('image', img[0]);

    
            axios.post('https://api.imgbb.com/1/upload', 
            imageData)
            .then(function (response) {
              console.log(response.data.data.display_url);
              if(response.data.data.display_url){
                  const data={
                      productName:productName,
                      weight:weight,
                      price:price,
                      imageURL:response.data.data.display_url,
                  }
                  fetch('http://localhost:5000/addProduct',{
                      method:'POST',
                      headers:{
                        'Content-Type':'application/json'
                      },
                      body: JSON.stringify(data)
                  })
                  .then(res => res.json())
                  .then(data =>{
                      setConfirmation({message:'added succesfully',color:'Green'})

                  })
                  .catch(error=>{
                      setConfirmation({message:'something went wrong',color:'red'})
                  })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container className={classes.addSection}>
                        <Grid item xs={6} className={classes.inputSection} >
                            <div >
                                <strong>Product Name:</strong><br />
                                {/* include validation with required or other standard HTML validation rules */}
                                <input name='product-name' placeholder="enter product name" {...register("productName", { required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.inputSection} >
                            <div >
                                <strong>number of pice/Weight</strong><br />
                                {/* include validation with required or other standard HTML validation rules */}
                                <input name="weight" placeholder="enter weight" {...register("weight", { required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.inputSection} >
                            <div >
                                <strong>Add Price</strong><br />
                                {/* include validation with required or other standard HTML validation rules */}
                                <input name="price" placeholder="enter price" {...register("price", { required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                            </div>
                        </Grid>
                        <Grid item xs={6} className={classes.inputSection} >
                            <div >
                                <strong>Add Photo</strong><br />
                                {/* include validation with required or other standard HTML validation rules */}
                                <input name='img-file' type='file' className={classes.file} {...register("img", { required: true })} />
                                {/* <label for='file'>Choose a Photo</label> */}
                                {/* errors will return when field validation fails  */}
                                {errors.exampleRequired && <span>This field is required</span>}

                            </div>
                        </Grid>
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item xs><p style={{color:confirmation.color}}>{confirmation.message}</p></Grid>
                            <Grid item xs></Grid>
                        </Grid>
                
                
                </Grid>
                
                <input type="submit" className={classes.btnSubmit }/>
            </form>
            
            
            
        </div>
    );
};

export default AddProduct;