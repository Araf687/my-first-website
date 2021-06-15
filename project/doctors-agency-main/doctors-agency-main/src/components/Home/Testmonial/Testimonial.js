import React from 'react';
import invertedComma from '../../../images/invertedComma.PNG'
import CustomerReview from '../CustomersReview/CustomerReview';
import customer1 from '../../../images/customer1.png'
import customer2 from '../../../images/customer2.png'
import customer3 from '../../../images/customer3.png'

const reviews=[
    {
        name:'Mohammad Yeasin',
        image:customer1,
        address:"Sabanghata"
    },
    {
        name:'Sayeda Rahnuma Akther',
        image:customer2,
        address:"Andarkillah"

    },
    {
        name:'Joyita Sen Gupta',
        image:customer3,
        address:"Pathorghata"
    },
     
    
]

const Testimonial = () => {
    return (
        <section className="container">
            <div className="row">
                <div className="col-md-6 pt-4">
                    <h5 style={{color:"rgb(15, 186, 158)"}}>Testmonial</h5>
                    <h2 className="mt-3">What's Our Patient's <br />Says</h2>
                </div>
                <div className="col-md-6 text-right">
                    <img src={invertedComma} className="img-fluid" style={{height:'200px',float:'right'}}/>
                </div>
                <div className="container">
                    <div className="row">
                    {reviews.map(data=><CustomerReview customerDetails={data}></CustomerReview>)}
                    </div>
                </div>
            </div>
            <br /><br />
        </section>
    );
};

export default Testimonial;