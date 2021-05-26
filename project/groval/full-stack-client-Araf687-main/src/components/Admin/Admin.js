import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import AddProduct from '../AddProduct/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
const useStyle=makeStyles(theme=>({
     sideBar:{
        backgroundColor:'#001a14',
        height:'100vh',
        color:'white',
        ['& ul']:{
            listStyle:"none",
        },
        ['& li']:{
            padding:'10px',
            '&:hover':{
                ['& a,icon']:{color:'yellow'}
            },
        },
        
        ['& a']:{
            textDecoration:"none",
            color:'white',
        },
        ['& h2']:{
            textAlign:'center',
        }


    },
    description:{
        // backgroundColor:'blue',
       
        ['& nav,section']:{
            color:'#001a14',
            padding:'20px 15px 10px 10px',
        },
        ['& section']:{
            backgroundColor:'#99ffb9',
            // opacity:'0.3',
        }


    },
    icon:{
        fontSize:'15px',
        margin:'0px 10px',
    }

}))
const Admin = () => {
    const classes = useStyle();
    return (
        <Router>

            <div className={classes.root}>
                        <Grid container>
                            <Grid item xs={2} className={classes.sideBar}>
                                <div className={classes.options}>
                                    <h2>Grocer Valley</h2>
                                    <ul>
                                        <li><Link to='/addProduct'><BiMessageSquareAdd className={classes.icon}/> Add Product</Link> </li>
                                        <li><Link to='/manageProduct'><BsFillGridFill className={classes.icon}/> Manage Product</Link></li>
                                        <li><Link to='/editProduct'><AiFillEdit className={classes.icon}/>Edit Product</Link></li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xs={10}>
                                <div className={classes.description}>
                                    <nav><h1 style={{margin:'0'}}>Add Product</h1></nav>
                                    <section>
                                        <Switch>
                                            <Route path="/addProduct">
                                                <AddProduct></AddProduct>
                                            </Route>
                                            <Route path="/manageProduct">
                                                <ManageProduct></ManageProduct>
                                            </Route>
                                            <Route path="/editProduct">
                                                edit product
                                            </Route>
                                            <Route path="/">
                                            <AddProduct></AddProduct>
                                            </Route>
                                        </Switch>    
                                    </section>
                                </div>
                                
                            </Grid>
                        </Grid>
                        
                    </div>
        </Router>
        
    
    );
};

export default Admin;