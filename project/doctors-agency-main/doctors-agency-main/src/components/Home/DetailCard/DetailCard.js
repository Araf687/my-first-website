import React from 'react';

const DetailCard = (props) => {
    const {name,image,phone}=props.detail;
    return (
        <div className="col-md-4 text-center">
            <img src={image} alt="" className="img-fluid"/>
            <h5 className="m-0 mt-2">{name}</h5>
            <small>{phone}</small>
        </div>
    );
};

export default DetailCard;