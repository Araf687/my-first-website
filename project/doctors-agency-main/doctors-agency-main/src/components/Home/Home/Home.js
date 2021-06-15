import React from 'react';
import Header from '../Header/Header';
import Services from '../Services/Services';
import ExceptionalServices from '../ExceptionalServices/ExceptionalServices'
import Appointment from '../Appointment/Appointment';
import Testimonial from '../Testmonial/Testimonial';
import Blogs from '../Blogs/Blogs';
import DoctorsDetails from '../DoctorsDetails/DoctorsDetails';
import ContactUs from '../ContactUs/ContactUs';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <ExceptionalServices></ExceptionalServices>
            <Appointment></Appointment>
            <Testimonial></Testimonial>
            <Blogs></Blogs>
            <DoctorsDetails></DoctorsDetails>
            <ContactUs></ContactUs>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;