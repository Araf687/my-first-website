import React, { useContext, useState,useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { UserContext } from '../../App';
import Checkouts from '../Checkouts/Checkouts';
import Dashboard from '../Dashboard/Dashboard';
import Header from '../Header/Header';
import Login from '../Login/Login';
import PrivateRoute from '../PrivateRout/PrivateRoute';
import SignUp from '../SignUp/SignUp';
import {  getDatabaseCart } from '../../utilities/databaseManager';
import OrderHistory from '../OrderHistory/OrderHistory';



export const HomeUserContext=createContext({});
const Home = () => {
    const [product,setProduct]=useState([]);
    const [ , , cart,setCart]=useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/getProduct')
        .then(res=>res.json())
        .then(data=>setProduct(data))
        .catch(err=>console.log(err))
        },[])
        useEffect(()=>{
            const savedCart=getDatabaseCart();
            const productKeys=Object.keys(savedCart);
            // console.log(productKeys,'hello',savedCart);
            const getProduct = productKeys.map(key => {
               if(product.length>0){
                const pdt=product.find(pd=> pd._id === key);
                pdt.quantity=savedCart[key];
                // console.log(savedCart[key],pdt);
                return pdt;
               }
               
            })
            setCart(getProduct);
            // console.log(getProduct);
            
        },[product])
    return (
        <HomeUserContext.Provider value={[product,setProduct]}>
            <Router>
                <Header></Header>
                <Switch>
                    <PrivateRoute path='/checkouts'>
                        <Checkouts></Checkouts>
                    </PrivateRoute>          
                    <Route path='/login'>
                        <Login></Login>
                    </Route>
                    <Route path='/signUp'>
                        <SignUp></SignUp>
                    </Route>
                    <Route path='/orderHistory'>
                        <OrderHistory ></OrderHistory>
                    </Route>
                    <Route path='/'>
                        <Dashboard pd={product}></Dashboard>
                    </Route>
                </Switch>
            </Router>

        // </HomeUserContext.Provider>
        
    );
};

export default Home;