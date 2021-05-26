import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Product from '../Product/Product';
import { addToDatabaseCart} from '../../utilities/databaseManager';
import { UserContext } from '../../App';
const useStyle=makeStyles(theme=>({
    root:{
        width:'65%',
        margin:'3% 15%',

    },
    form:{
        textAlign:'center',
        
    },
    input:{
        width:'500px',
        height:'28px',
        borderRadius:'5px',
        ['& input']:{
            border:'none',
            ['&:focus']:{
                border:'none'
            }
        },
        margin:'40px 0px',
    },
    btn:{
        width:'70px',
        height:'35px',
    }
}))


const Dashboard = (props) => {
    const product=props.pd;
    const classes=useStyle();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [,,cart,setCart]=useContext(UserContext);
    const handleAddToCart=(props)=>{
        const productToBeAdd=props;
        // console.log(productToBeAdd._id,cart);
        const sameProduct=cart.find(pd => pd._id === productToBeAdd._id);
       
        let newCart;
        if(sameProduct)
        {
            console.log(sameProduct.quantity);
            sameProduct.quantity=sameProduct.quantity+1;
            const others=cart.filter(pd=>pd._id!==sameProduct._id);
            newCart=[...others,sameProduct];
        }
        else{
            productToBeAdd.quantity=1;
            newCart=[...cart,productToBeAdd];
            //console.log(cart);
        }  
        // console.log(newCart);
        setCart(newCart);
        // console.log(cart);
        addToDatabaseCart(productToBeAdd._id,productToBeAdd.quantity);
    }


    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                        {/* <BiSearchAlt2/> */}
                    {/* register your input into the hook by invoking the "register" function */}
                    <input className={classes.input} placeholder='search items' {...register("productName")} />
                   
                    <Button variant="contained" className={classes.btn} color="secondary" onClick={handleSubmit(onSubmit)}>
                        Search
                    </Button>
                </form>
            </div>
            <div>
                <Grid container>

                    {product.map(pd=><Grid item m={2} lg={3}> <Product handleAddToCart={handleAddToCart} key={pd._id} product={pd}></Product> </Grid>)}
                </Grid>
            </div>





            {/* <Login></Login>
            <SignUp></SignUp> */}
        </div>
    );
};

export default Dashboard;