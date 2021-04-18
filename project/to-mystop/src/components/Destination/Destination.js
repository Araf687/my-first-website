import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import './Destination.css';
import car from '../img/car.png';
import bike from '../img/bike.png';
import bus from '../img/bus.png';
import train from '../img/train.png';
import peopleIcon from '../img/peopleicon.png';
import pickUPLocationImg from '../img/pickupLocation.png';
import destinationImg from '../img/destination.png';
import Map from '../Map/MAP';

const Destination = () => {
    const {rideType}=useParams();
    const image={car:car,bike:bike,bus:bus,train:train};
    let passenger=0;

    const getRandomInteger=(min, max)=> {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let payment;
    if(rideType==='car'){
        payment= getRandomInteger(100,450);
    }
    else if(rideType==='bike'){
        payment= getRandomInteger(30,200);
    }
    else if(rideType==='bus'){
        payment= getRandomInteger(300,600);
    }
    else{
        payment= getRandomInteger(300,600);

    }

    const [rideDetails,setRideDetails]=useState({locationConfirmation:false});
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
        const {pickUpLocation,Destination,date}=data;
        const details={
            pickUpLocation:pickUpLocation,
            destination: Destination,
            date:date,
            locationConfirmation:true,
        }
        setRideDetails(details);
        

    }
    return (
        <div>
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className='confirm-location'>

                            {rideDetails.locationConfirmation && 
                            <div>
                                <div className='locations'>
                                    <div>
                                        <p style={{textAlign:'center',color:'white'}}> <strong>{rideDetails.date}</strong></p>
                                        <h5><img src={pickUPLocationImg} alt=""/>{rideDetails.pickUpLocation}</h5> <br/>
                                        <h5><img src={destinationImg} alt=""/>{rideDetails.destination}</h5>
                                    </div>
                                </div>
                                <div className='ride-expense'>

                                    <span><img src={image[rideType]} alt=""/><strong> {rideType}</strong></span>
                                    <span><img style={{height:'25px',width:'25px',marginTop:'12px'}}src={peopleIcon} alt=""/><small>{passenger=getRandomInteger(1,5)}</small></span>
                                    <p>${payment*passenger}</p>
                                </div>
                                <div className='ride-expense'>
                                    <span><img src={image[rideType]} alt=""/><strong> {rideType}</strong></span>
                                    <span><img style={{height:'25px',width:'25px',marginTop:'12px'}}src={peopleIcon} alt=""/><small>{passenger=getRandomInteger(1,5)}</small></span>
                                    <p>${payment*passenger}</p>
                                </div>
                                <div className='ride-expense'>
                                    <span><img src={image[rideType]} alt=""/><strong> {rideType}</strong></span>
                                    <span><img style={{height:'25px',width:'25px',marginTop:'12px'}}src={peopleIcon} alt=""/><small>{passenger=getRandomInteger(1,5)}</small></span>
                                    <p>${payment*passenger}</p>
                                </div>
                            </div>}
                            {!rideDetails.locationConfirmation && <form onSubmit={handleSubmit(onSubmit)}>
                                <h6>Pick From</h6>
                                <input {...register("pickUpLocation", { required: true })} />
                                {errors.pickUpLocation && <span>This field is required</span>}
                                <h6>Destination</h6>
                                <input {...register("Destination", { required: true })} />
                                {errors.Destination && <span>This field is required</span>}
                                <h6>Date</h6>
                                <input type="date" {...register("date", { required: true })} />
                                {errors.date && <span>This field is required</span>}
                                <input className='submit-button' type="submit" value='search'/>
                            </form>}
                        </div>

                    </Col>
                    <Col sm={8} className='map'>
                        <Map></Map>
                    </Col>

                    
                </Row>
            </Container>
            
        </div>
    );
};

export default Destination;