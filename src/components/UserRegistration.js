import React, { useState } from 'react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});

      // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
}