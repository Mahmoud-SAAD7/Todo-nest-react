import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({ mode: 'onChange' });
  const emailRegex = /^[a-zA-Z\d]+@\S+\.[a-zA-Z]{2,}$/;


  const onSubmit = (data) => {
    console.log(data);
    axios.post('http://localhost:3000/users/signUp', data)
      .then((res) => {
        alert("User created successfully!");
      })
      .catch((err) => {
        alert(`Error creating user: ${err.message}`) })
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            {...register('username', { required: 'Username is required' })}
            placeholder="Enter username"
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
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
            id="password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
            placeholder="Enter password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="mt-3 text-black btn btn-primary hover:text-white">Submit</button>
      </form>
    </>
  );
}
