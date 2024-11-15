import { useState, FormEvent, ChangeEvent } from "react";
import { login } from "../api/authAPI.js";
import auth from "../utils/auth.js";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      console.log(data);
      if (data.token){
        auth.login(data.token);
      }
      else{
        setError('Invalid login credentials');
      }
    } catch (err) {
      console.error('Failed to login', err);
      setError('Invalid login credentials');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <p style={{color:"pink",fontWeight:"bold"}}>{errorMessage}</p>
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
