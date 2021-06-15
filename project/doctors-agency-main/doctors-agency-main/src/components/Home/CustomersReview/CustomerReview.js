import React from 'react';
// import customer1 from '../../../images/customer1.png';
// import customer2 from '../../../images/customer2.png';
// import customer3 from '../../../images/customer3.png';

const CustomerReview = (props) => {
    const {name,image,address}=props.customerDetails;
    return (
        <div className="col-md-4 ">
            <div className="shadow" style={{padding:"6% 7%"}}>
                <p className="mb-5" style={{lineHeight:"30px"}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't a anything embarrassing hidden in the middle of text.</p>
                <div className="d-flex justify-self-center ">
                    <div style={{marginRight:'20px'}}>
                        <img src={image} className="img-fluid ms-1" style={{height:"50px"}} alt="" />
                    </div>
                    <div>
                        <h6 className="m-0 mt-1" style={{color:"rgb(15, 186, 158)",fontWeight:"700"}}>{name}</h6>
                        <small className="text-secondary" style={{fontWeight:"500"}}>{address}</small>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CustomerReview;