import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ mode: 'onChange' });
  const emailRegex = /^[a-zA-Z\d]+@\S+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', data);
      const { token } = response.data;

      // Save token in localStorage
      localStorage.setItem('token', token);

      alert('Login successful!');
      return navigate("/"); 
    } catch (error) {
      setError('email', { type: 'manual', message: error.response.data.message }); // Set error message for email field
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="Email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
            id="password"
            placeholder="Password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="mt-3 text-black btn btn-primary">Submit</button>
      </form>
    </>
  );
}
