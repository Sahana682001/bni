// src/components/HeroSection.js
import React from 'react';
import bniGroupImg from '../../asset/banner.png'; // replace with your actual path
import './HeroSection.css'

const HeroSection = () => {
    return (
        <div className='light'>
            <div className="container py-3 banner">
                <div className="row align-items-center">
                    {/* Left Text Section */}
                    <div className="col-lg-7">
                        <p className="red-color first">
                            World's most successful referral networking organization With
                        </p>
                        <h1 className="big-title grey-color">
                            Changing the Way <br />
                            the World Does <span className="red-color">Business®</span>
                        </h1>
                        <p className="grey-color text mt-3 mb-4">
                            With thousands of BNI Chapters worldwide, <br />
                            BNI provides a global business network that remains unmatched.
                        </p>
                        <p className="fw-bold text-danger">
                            GROW YOUR BUSINESS | BUILD RELATIONSHIPS | SHARPEN YOUR SKILLS
                        </p>
                    </div>

                    {/* Right Image + Stat */}
                    <div className="col-lg-5 text-center mt-lg-0">
                        <img src={bniGroupImg} alt="BNI Group" className="img-fluid" />
                        <div className="bg-dangerr text-white d-flex justify-content-center mx-auto">
                            <div className="total">Total Business <br/> till date </div>
                            <div className="number"> 63,58,03,178</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HeroSection;
