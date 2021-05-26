import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid} from '@material-ui/core';
import { useHistory } from 'react-router';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin:'20px 9px',
    ['& a']:{
        textDecoration:'none',
    }
  },
  media: {
    height: 230,
  },
  img:{
      height:100
  },
  btn:{
    width: '93px',
    fontSize: '12px',
    fontWeight:' 700',
  },
});
const Product = (props) => {
    // console.log(props);
    const {imageURL,price,weight,productName}=props.product;
    const classes = useStyles();
    const history=useHistory();
    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={imageURL}
            title="Contemplative Reptile"
            />
            <CardContent style={{textAlign:'center'}}>
             <p style={{fontSize:'16px',margin:'10px'}}>{productName}</p>
             <strong style={{color:'#999999'}}>{weight}</strong>

            </CardContent>
        </CardActionArea>
        <Grid container style={{padding:'20px 8px'}}>
            <Grid item><h3 style={{margin:'0'}}><strong>৳</strong> {price}</h3></Grid>
            <Grid item xs></Grid>
            <Grid item>
                <Button variant="contained" className={classes.btn} color="secondary"
                onClick={()=>{
                    props.handleAddToCart(props.product);
                }}>
                    Buy Now
                </Button>
            </Grid>
        </Grid>
        </Card>
    );

};
export default Product;