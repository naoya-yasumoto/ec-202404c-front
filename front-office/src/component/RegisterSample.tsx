import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>('');
    const [zipResult, setZipResult] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://192.168.16.175:8080/ec-202404c/users', { name:username, password:password });
            setMessage('User registered successfully!');
            console.log(response);
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    const handleUserAPI = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://192.168.16.175:8080/ec-202404c/users');
            console.log(response);
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    const handleZipcodeAPI = async (event: FormEvent) => {
        event.preventDefault();
        setZipcode(event.target.value);
        try {
            const response = await axios.get('https://zipcoda.net/api', {
                params: {
                  zipcode: event.target.value
                }
              })
            if(response.status === 200){
                console.log(response.data.items);
                setZipResult(response.data.items[0].address);
            }
        } catch (error) {
            setMessage('Registration failed.');
            setZipResult("");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <form onSubmit={handleUserAPI} style={{marginTop:"20px"}}> 
                <button type='submit'>getUser</button>
            </form>
            <input 
                        type="input" 
                        value={zipcode} 
                        onChange={(e) => handleZipcodeAPI(e)} 
                        required 
                    />
            <div>{zipResult}</div>
        </div>
    );
};

export default Register;
