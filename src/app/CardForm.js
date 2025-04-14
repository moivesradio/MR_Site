'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './CardForm.css';


export default function CardForm() {
  const [formData, setFormData] = useState({
    name: '',
    craft: '',
    email: '',
    phone: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these with your actual EmailJS values
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;;

    const templateParams = {
      from_name: formData.name,
      craft: formData.craft,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      to_email: 'dregulavalsa@gmail.com', // optional, depending on your template setup
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.text);
        alert('Submitted! We will get back to you soon.');
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="card-form">
      <h2>Join the Journey</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Full Name" required onChange={handleChange} />
        <input name="craft" type="text" placeholder="Craft Interested In" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} />
        <textarea name="experience" placeholder="Previous Experience" rows={4} onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
