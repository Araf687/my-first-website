import { Button, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { UserContext } from '../../App';

import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

import Avatar from '@material-ui/core/Avatar';


const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);


const useStyle=makeStyles(theme=>({
    root:{
        width:'1000px',
        margin:'0 auto',

    },
    header:{
        ['& ul']:{
            listStyle:'none',
        },
        ['& a']:{
            textDecoration:'none',
            color:'black',
        },
        ['& li']:{
            display:'inline-block',
            marginLeft:'20px',
            ['&:hover']:{
                ['& a']:{
                    color:'green',
                }
            }
           
        },
        ['& h2']:{
            margin:'10px 0px'
        },
     
    },
    displayNone:{
        display:'none',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding:'10px',
        width:'450px',
        overflowY:'scroll',
        height:'600px',
        // border:'none',
        borderRadius:'10px',


        '&::-webkit-scrollbar': {
          width: '0.4em',
          
          
          
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          border:'2px solid rgba(0,0,0,.1)',
          borderRadius:'30px',
          
        },
        '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'rgba(0,0,0,.1)',
            backgroundColor:'red',
            borderRadius:'10%'
          
        }
        
      },
}))

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };
  


const Header = () => {
    const classes=useStyle();
    const [user,,cart,]=useContext(UserContext);
    const history=useHistory()
    // console.log(cart);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div className={classes.root}>
            <Grid container className={classes.header}>
                <Grid item xs={3}>
                    <Link to="/Home"><h2>Grocer-Valley</h2></Link>
                </Grid>
                <Grid item xs></Grid>
                <Grid item>
                    <ul>
                        <li><Link to="/Home"><strong>Home</strong></Link></li>
                        <li><Link to="/checkouts"><strong>Checkouts</strong></Link></li>
                        <li><a href="/admin"><strong>Admin</strong></a></li>
                        {!user.email && <li><Link to="/login"><strong>Login</strong></Link></li>}
                        <li><StyledBadge badgeContent={cart.length} onClick={handleOpen} color="secondary">
                          <ShoppingCartIcon />
                        </StyledBadge></li>
                        {user.email && 
                        <li><span style={{display:'flex',justifyContent:'center'}}>
                        <Avatar style={{height:'25px',width:'25px'}} src={user.image||"/broken-image.jpg"} />
                        <small style={{marginLeft:'5px'}}><strong>{user.name||user.email}</strong></small>
                      </span> </li>
                        }
                    </ul>
                </Grid>
            </Grid>
            <div>
            {/* //modal for shopping cart */}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                
                }}
                disableAutoFocus

            >
                <Fade in={open}>
                <div className={classes.paper} >
                    
                    {
                      !cart[0] && <h3 style={{textAlign:'center',marginTop:'50%',color:'#999999'}}>Shopping Bag is empty</h3>
                    }
                    <div>
                      <h3 style={{textAlign:'center',}}>Your Shopping Bag</h3>
                      <Grid container style={{margin:'40px 0px',textAlign:'center',color:'#999999'}}>
                        <Grid item lg={3}>
                            <small><strong>Product</strong></small>
                        </Grid>
                        <Grid item lg={7}>
                            <small><strong>Product Name</strong></small>
                        </Grid>
                        <Grid item lg={2} style={{textAlign:'center',}}>
                            <small><strong>Quantity</strong></small>
                        </Grid> 
                    </Grid>

                    </div>
                    
                    {cart[0] && cart.map(pd=><ShoppingCart key={pd._id} product={pd}></ShoppingCart>)}
                    {cart[0] && 
                    <Grid container>
                      <Grid item xs></Grid>
                      <Grid item xs={9}><Button variant="contained" style={{width:'100%',margin:'40px 0px'}} color="secondary"onClick={()=>{handleClose(); history.push('/checkouts');}}>
                          Checkouts
                      </Button></Grid>
                      <Grid item xs></Grid>
                    </Grid>
                    
                    }
                </div>
                </Fade>
            </Modal>
            </div>
        </div>
    );
};

export default Header;