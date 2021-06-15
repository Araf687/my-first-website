import React from 'react';
import './Footer.css';
import {  FaFacebook } from 'react-icons/fa';
import {  ImGoogle3 } from 'react-icons/im';
import {  FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
         <footer className="container pt-5 mb-3">
             <div className="row footer-row">
                 <div className="col-md-3">
                     <br />
                     <ul>
                         <li><a href="#">Emergency Dental Care</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Treatment of Personal Disease</a></li>
                         <li><a href="#">Tooth Extraction</a></li>
                         <li><a href="#">Check Up</a></li>
                     </ul>

                 </div>
                 <div className="col-md-3">
                     <h5>Services</h5>
                     <ul>
                        <li><a href="#">Emergency Dental Care</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Treatment of Personal Disease</a></li>
                         <li><a href="#">Tooth Extraction</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Check Up</a></li>
                     </ul>
                 </div>
                 <div className="col-md-3">
                    <h5>Oral Health</h5>
                     <ul>
                        <li><a href="#">Emergency Dental Care</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Treatment of Personal Disease</a></li>
                         <li><a href="#">Tooth Extraction</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Check Up</a></li>
                         <li><a href="#">Check Up</a></li>
                     </ul>
                 </div>
                 <div className="col-md-3">
                     <h5>Our Address</h5>
                     <ul>
                         <li><a href="">Bahaddarhat-103001 Chandgaon</a></li>
                         <li><a href="">Yards</a></li>
                     </ul>
                     <div className="social-medias">
                        <span><a href="#"><FaFacebook/></a></span>
                        <span><a href="#"><ImGoogle3/></a></span>
                        <span><a href="#"><FaTwitter/></a></span>  
                     </div>
                     <ul>
                         <li>Call Now</li>
                         <li>+880 1614756856</li>
                     </ul>
                 </div>
                 <p className="text-center mt-5">Copyright 2021 All Rights Reserved</p>
             </div>
         </footer>
    );
};

export default Footer;