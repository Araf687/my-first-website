import React from 'react';
import DetailCard from '../DetailCard/DetailCard';
import appointment1 from '../../../images/appointment1.png'

const Details=[{
    name:"Dr. Farhan",
    image:appointment1,
    phone:"01316396996",
},
{
    name:"Dr. Afridi",
    image:appointment1,
    phone:"01864489870",

},
{
    name:"Dr. Emon",
    image:appointment1,
    phone:"01847140372",
}]

const DoctorsDetails = () => {
    return (
        <div className="container mb-5">
            <div className="row">
                <h5 className="text-center" style={{color:'rgb(15, 186, 158)'}}>OUR DOCTORS</h5>
                {Details.map(data=> <DetailCard detail={data}></DetailCard> )}
            </div>
        </div>
    );
};

export default DoctorsDetails;