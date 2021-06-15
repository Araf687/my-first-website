import React from 'react';

const BlogContent = (props) => {
    const {author,image,time,title,description}=props.content;
    return (
        <div className="col-md-4" style={{borderRadius:"10px"}}>
            <div className="shadow m-1 p-4" >
                <div className="d-flex mb-4">
                    <div className="me-2">
                        <img src={image} className="img-fluid" style={{height:'50px',borderRadius:'100px'}} alt="" />
                    </div>
                    <div>
                        <h6 className="m-0 mt-1">{author}</h6>
                        <small className="text-secondary"> <small>{time}</small> </small>
                    </div>
                </div>
                <div>
                    <h5 style={{height:'60px'}}>{title}</h5>
                    <p className="text-secondary">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogContent;