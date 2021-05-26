import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { UserContext } from '../../App';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';
import { HiCurrencyBangladeshi } from "react-icons/hi";

const useStyle=makeStyles(theme=>({
    root:{
        margin:'15px 0',
        fontsize:'16px',
        padding:'5px'
    },
    icon:{
        width:'25px',
        height:'25px',
        color:'#ff0000',
    }
}));

const ReviewProduct = (props) => {
    const classes=useStyle();
    const {productName,quantity,price}=props.product;
    const [,,cart,setCart]=useContext(UserContext);

    const handleDelete=(product)=>{
        const newCart=cart.filter(pd=>pd._id!==product._id);
        setCart(newCart);
        removeFromDatabaseCart(product._id);
        console.log(newCart);

    }
    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item lg={5}><strong>{productName}</strong></Grid>
                <Grid item lg={2} style={{textAlign:'center'}}><strong>{quantity}</strong></Grid>
                <Grid item lg={2} style={{textAlign:'center'}}> <strong> {price}</strong> </Grid>
                <Grid item lg={2} style={{textAlign:'center'}}> <strong> {price*quantity}</strong> </Grid>
                <Grid item lg={1} style={{textAlign:'center'}}><RiDeleteBin6Fill className={classes.icon} onClick={()=>{handleDelete(props.product)}}/></Grid>
            </Grid>
        </div>
    );
};

export default ReviewProduct;