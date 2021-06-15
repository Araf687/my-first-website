import React from 'react';
import { useForm } from "react-hook-form";
import './ContactUs.css';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <section className="p-5 mb-5 text-center contact-section">
            <div >
                <div className="contact-form">
                    <h5 style={{color:'rgb(14, 230, 194)'}}>CONTACT US</h5>
                    <h2 className="mb-5">Always Contact With Us</h2>
                    <form onSubmit={handleSubmit(onSubmit)}> 
                        {/* include validation with required or other standard HTML validation rules */}
                        <input {...register("email", { required: true })} placeholder="Email*"/> <br />
                        {/* errors will return when field validation fails  */}
                        {errors.email && <span>This field is required</span>} <br />
                        <input {...register("subject", { required: true })} placeholder="Subject*"/> <br />
                        {/* errors will return when field validation fails  */}
                        {errors.subject && <span>This field is required</span>} <br />

                        <textarea rows="5" cols="75" {...register("description", { required: true })} placeholder="Message*"/> <br />
                        {/* errors will return when field validation fails  */}
                        {errors.description && <span>This field is required</span>} 
                        <br />
                        <button type="submit" className="btn submit-btn">SUBMIT</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;