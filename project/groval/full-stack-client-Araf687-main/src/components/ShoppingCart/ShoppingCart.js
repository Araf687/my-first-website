import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyle=makeStyles(theme=>({
    root:{
        ['& img']:{
            width:'70%'
        },
        ['& p']:{
            fontSize:'14px',
            marginLeft:'10px',
        },
        textAlign:'center',
    }
}))


const ShoppingCart = (props) => {
    const classes=useStyle();
    const {imageURL,productName,quantity}=props.product;
    console.log(props.product);
    return (
        <div className={classes.root}>
            <Grid container style={{margin:'15px 0px'}}>
                    <Grid item lg={3}>
                        <img src={imageURL} alt="" />
                    </Grid>
                   <Grid item lg={7}>
                        <strong><p>{productName}</p></strong>
                    </Grid>
                    <Grid item lg={2} style={{textAlign:'center',}}>
                        <strong><p>{quantity}</p></strong>
                    </Grid> 
             </Grid>
        </div>
    );
};

export default ShoppingCart;