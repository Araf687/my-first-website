import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';
import bus from '../img/bus.png';
import car from '../img/car.png';
import bike from '../img/bike.png';
import train from '../img/train.png';
import './Home.css'

const Home = () => {
    const history=useHistory();
    
    const handleRide=(rideType)=>
    {
        history.push(`/destination/${rideType}`);
    }
    const cars=car;
    return (
        <div className='text-center home-container' >
          <Container>
            <Row>
                <Col>
                    
                    <Card onClick={()=>handleRide('car')} style={{ width: '15rem',margin:'10px 0px' }}>
                        <Card.Img className='img' variant="top" src={cars} />
                        <Card.Body>
                            <Card.Title>Car</Card.Title>
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                    
                    <Card onClick={()=>handleRide('bike')} style={{ width: '15rem',margin:'10px 0px' }}>
                        <Card.Img className='img' variant="top" src={bike} />
                        <Card.Body>
                            <Card.Title>Bike</Card.Title>
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>
                    
                    <Card onClick={()=>handleRide('bus')} style={{ width: '15rem',margin:'10px 0px' }}>
                        <Card.Img className='img' variant="top" src={bus} />
                        <Card.Body>
                            <Card.Title>Bus</Card.Title>
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col>      
                    <Card onClick={()=>handleRide('train')} style={{ width: '15rem' }}>
                        <Card.Img className='img' variant="top" src={train} />
                        <Card.Body>
                            <Card.Title>Train</Card.Title>
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
          </Container>
        </div>
    );
};

export default Home;