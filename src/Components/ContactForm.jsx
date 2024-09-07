import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  
  useEffect(() => {
    const storedData = localStorage.getItem('contactFormSubmissions');
    if (storedData) {
      setSubmissionSuccess(false);
    }
  }, []);

  useEffect(() => {
    if (submissionSuccess) {
      const timer = setTimeout(() => {
        setSubmissionSuccess(false);
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [submissionSuccess]);

  const validateForm = () => {
    const validationErrors = {};

    if (!name) {
      validationErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Please enter a valid email';
    }

    if (!message) {
      validationErrors.message = 'Message is required';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
     
      await axios.post('http://localhost:9966/api/contact/save', {
        name,
        email,
        message,
      });

      
      const storedData = localStorage.getItem('contactFormSubmissions') || '[]';
      const submissions = JSON.parse(storedData);
      submissions.push({ name, email, message });
      localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));

      setSubmissionSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'There was an error submitting the form. Please try again later.' });
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>

      {submissionSuccess && (
        <div className="success-message alert alert-success" role="alert">
          Thank you! Your message has been submitted successfully.
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-5 border rounded shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="message">Message</label>
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
