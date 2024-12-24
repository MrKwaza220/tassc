import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1>About Us</h1>
                <p className="about-intro">
                    Welcome to Tassc! We are passionate about simplifying your task management and enhancing productivity. 
                    With a user-centric approach, we aim to deliver tools that help individuals and teams thrive.
                </p>
                
                <h2>Our Mission</h2>
                <p>
                    At Tassc, our mission is to empower people to organize their tasks effectively and achieve their goals with ease.
                    We believe in creating solutions that inspire and improve everyday workflows.
                </p>
                
                <h2>Our Team</h2>
                <p>
                    We are a team of dedicated professionals with a shared vision of building tools that matter.
                    Our diverse background enables us to innovate and deliver outstanding experiences.
                </p>
                
                <h2>Join Us</h2>
                <p>
                    Be a part of our journey! Explore our platform, provide feedback, or reach out to collaborate. Together, let’s achieve more!
                </p>
            </div>
        </div>
    );
};

export default About;
