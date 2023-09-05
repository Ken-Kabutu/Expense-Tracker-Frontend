import React, { useState } from 'react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState({});
}