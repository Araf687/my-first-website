import React from 'react';
import BlogContent from '../BlogContent/BlogContent';
import jishat from '../../../images/jishat.jpg';
import opu from '../../../images/opu.jpg';
import araf from '../../../images/araf.jpg';

const blogContents=[
    {
        author:'Dr. Araf',
        image:araf,
        time:'22 August,2020',
        title:'Check at least a doctor in year for your teeth',
        description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis mollitia sint facere necessitatibus facilis est?Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        

    },
    {
        author:'Dr. Istiak Chowdhury',
        image:opu,
        time:'23 April,2021',
        title:'The tooth cancer is taking a challenge',
        description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis mollitia sint facere necessitatibus facilis est?Lorem ipsum dolor sit amet consectetur adipisicing elit.',

    },
    {
        author:'Dr. Azizur Rahaman',
        image:jishat,
        time:'19 may,2021',
        title:'Two times of brush in a da can keep you healthy.',
        description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis mollitia sint facere necessitatibus facilis est?Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  
]

const Blogs = () => {
    return (
        <div className="my-5">
            <div className="text-center">
                <h5 style={{color:"rgb(15, 186, 158)"}}>OUR BLOGS</h5>
                <h2>From Our Blog News</h2>
            </div>
            <div className="container mt-5">
                <div className="row"> 
                    {blogContents.map(content=><BlogContent content={content}></BlogContent>)}
                </div>
            </div>
        </div>
    );
};

export default Blogs;