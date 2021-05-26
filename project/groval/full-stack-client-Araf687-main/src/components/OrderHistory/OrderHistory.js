import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { UserContext } from '../../App';
import { HomeUserContext } from '../Home/Home';
import { processOrder } from '../../utilities/databaseManager';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const {data,allProduct} = props;
  const {date,totalPrice,shippingDetails,products}=data

//   console.log(data,allProduct);
//   console.log(date,totalPrice,shippingDetails,products);
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const productKeys=Object.keys(products);
//   console.log(productKeys);
    const getProduct = productKeys.map(key => {
        if(allProduct.length > 0){
          const pdt=allProduct.find(pd=> pd._id === key);
          pdt.quantity=products[key];
          return pdt;
        }
    })
    // console.log(getProduct);
    

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            <strong><p>{date}</p></strong>
        </TableCell>
        <TableCell align="center"><strong><p>{getProduct.length}</p></strong></TableCell>
        <TableCell align="center"><strong><p>{totalPrice}</p></strong></TableCell>
        <TableCell align="center"><strong><p>{shippingDetails.address}</p></strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div"> 
                <h3>Details</h3>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product</strong></TableCell>
                    <TableCell><strong>Product Name</strong></TableCell>
                    <TableCell align="center"><strong>Quantity x price</strong></TableCell>
                    <TableCell align="center"><strong>subtotal Price</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getProduct.map((pd) => (
                    <TableRow key={pd._id}>
                      <TableCell component="th" scope="row">
                        <img src={pd.imageURL} style={{width:'60px'}} alt="" />
                      </TableCell>
                      <TableCell>{pd.productName}</TableCell>
                      <TableCell align="center"> {pd.quantity} X {pd.price}</TableCell>
                      <TableCell align="center">
                         {pd.quantity*pd.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const useStyle=makeStyles(theme=>({
    root:{
        marginTop:'40px',
        width:'900px',
        margin:'0 auto'
    },
    table:{
        overflowX:'hidden',
    }
}))

const OrderHistory = () => {
    const [product,]=useContext(HomeUserContext);
    const classes=useStyle();
    const[user,,,]=useContext(UserContext);
    const [orderedProducts,setOrderedProducts]=useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/getOrders/${user.email}`)
        .then(res=>res.json())
        .then(data=>setOrderedProducts(data))
        .catch(err=>console.log(err))
    },[])
    
    // console.log(cart,user);
    return ( 
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                    <TableRow >
                        <TableCell />
                        <TableCell><h4 style={{color:'#999999',margin:'0px'}}>Date</h4></TableCell>
                        <TableCell align="center"> <h4 style={{color:'#999999',margin:'10px'}}>Number of Product</h4></TableCell>
                        <TableCell align="center"> <h4 style={{color:'#999999',margin:'10px'}}>Total Price</h4></TableCell>
                        <TableCell align="center"> <h4 style={{color:'#999999',margin:'10px'}}>Shipping Destination</h4></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {orderedProducts[0] && orderedProducts.map((orderedData) => (
                        <Row key={orderedData._id} data={orderedData} allProduct={product} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderHistory;