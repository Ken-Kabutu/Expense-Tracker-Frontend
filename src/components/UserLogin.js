import React, { useState } from 'react';


const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});


      // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

      // Function to validate the login form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        }

        if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
        }

        // Set errors and return true if there are no errors
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

}