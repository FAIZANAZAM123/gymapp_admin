import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios';

import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// import { connect, useDispatch } from 'react-redux';
import logo from '../../images/logo-full.png'

function Register(props) {
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    const navigate = useNavigate();

    const onSignUp = async (e) => {
        e.preventDefault();
    
        // Validation logic (you can customize this)
        if (!username || !email || !password) {
            setErrors({ email: 'Please fill all the fields', password: '' });
            return;
        }
    
        try {
            const postData = {
                username,
                email,
                password,
            };
    
            const response = await axios.post(`http://localhost:5000/register`, postData);
    
            // Handle the response from the server
            console.log(response.data);
    
            // Assuming you have a function to set success message
            // props.setSuccessMessage(response.message);
    
            // Redirect or do other actions upon successful registration
            navigate("/login", { replace: true });
        } catch (error) {
            // Handle errors from the server
            console.error('Registration failed:', error.response.data);
            setErrors({ email: '', password: error.response.data.error });
        }
    };
    
    

    


  return (
    <div style={{marginTop:'300px'}} className='authincation h-100 p-meddle'>
        <div className='container h-100'>
            <div className='row justify-content-center h-100 align-items-center'>
                <div className='col-md-6'>
                    <div className='authincation-content'>
                        <div className='row no-gutters'>
                            <div className='col-xl-12'>
                                <div className='auth-form'>
                                    <div className='text-center mb-3'>
                                        <img src={logo} alt="" />
                                    </div>

                                    <h4 className='text-center mb-4 text-white'>Sign up your account</h4>
                                    {props.errorMessage && (
                                        <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                                            {props.errorMessage}
                                        </div>
                                    )}
                                    {props.successMessage && (
                                        <div className='bg-green-300 text-danger text-green-900  p-1 my-2'>
                                            {props.successMessage}
                                        </div>
                                    )}
                                    
                                    <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Name</strong>
                                            </label>
                                            <input type="text" className="form-control"
                                                value={username}
												placeholder='Name'
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Email</strong>
                                            </label>
                                            <input type="email" className="form-control"
                                                value={email}
												placeholder='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Password</strong>
                                            </label>
                                            <input type="password" className="form-control"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
												placeholder='password'
                                            />
                                        </div>
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                        <div className='text-center mt-4'>
                                            <button onClick={onSignUp} type='submit' className='btn bg-white text-primary btn-block'>
                                                Sign up
                                            </button>
                                        </div>
                                    
                                    <div className='new-account mt-3 text-white'>
                                        <p>
                                            Already have an account?{' '}
                                            <Link className='text-white' to='/login'>
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}



export default Register
