import React  from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyle=makeStyles(theme=>({
        productDetails:{
                textAlign:'center',
                padding:'10px',
                ['& p']:{
                        margin:'2px 0px'
                },
                ['& button']:{
                        float:'right',
                }
        }
}))

const ShowProduct = (props) => {
    const classes=useStyle();
//     console.log(props.product);
    const {productName,price,imageURL,_id}=props.product
//     console.log(productName,weight,price,imageURL,_id)

    const handleDelete=(event)=>{
        const product=event.target.parentNode.parentNode;
        const url = `http://localhost:5000/deleteProduct/${_id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
           console.log('success delete');
        })
            product.style.display='none';


    }


    return (
        <div>
            <Grid container>
                <Grid className={classes.productDetails} item xs={4} >
                    <p>{productName}</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={1} >
                    <p>{price}</p>
                </Grid>
                <Grid className={classes.productDetails}  item xs={5} >
                    <p>{imageURL}</p>
                </Grid>
                <Grid className={classes.productDetails} >
                    <button >edit</button> 
                    <button  onClick={handleDelete}>delete</button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ShowProduct;