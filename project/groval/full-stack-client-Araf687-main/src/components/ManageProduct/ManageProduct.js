import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ShowProduct from './ShowProduct';

const useStyle=makeStyles(theme=>({
    productDetails:{
        textAlign:'center',
        marginBottom:'10px',
        ['& p']:{
            margin:'0'
        },
    },
    detailBoard:{
        backgroundColor:'white',
        borderRadius:'10px',}
}))
const ManageProduct = () => {
    const classes=useStyle();
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/getProduct')
        .then(res=>res.json())
        .then(data=>setProduct(data))
        .catch(err=>console.log(err))
        },[])
    return (
        <div className={classes.detailBoard}> 
            <Grid container style={{backgroundColor:'lightgrey'}}>
                <Grid className={classes.productDetails} item xs={4} spacing={2} >
                    <p>Product Name</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={1} spacing={2} >
                    <p>Price</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={5} spacing={2} >
                    <p>Image URL</p>
                </Grid>
            </Grid>
            {product.map(pd=><ShowProduct product={pd}></ShowProduct>)}
        </div>
    );
};

export default ManageProduct;