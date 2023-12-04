import React, { useState } from 'react';
import { UserDetails } from '../models';
import useInput from '../utils';

const LoginFormModal: React.FC = () => {

    const [inputUsername, username, setUsername] = useInput("", "Insert username", "text", "input input-bordered w-full max-w-xs");
    const [inputPassword, password, setPassword] = useInput("", "Insert password", "password", "input input-bordered w-full max-w-xs");

    const url = 'http://localhost:8080/login';

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //toda a lógica do login aqui (pedido à API)

        const userDetails: UserDetails = {
            username: username,
            password: password
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userDetails),
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response;
            })
            .then((response) => response.headers.get('authorization'))
            .then((authorizationHeader) => {
                if (authorizationHeader) {
                    const token = authorizationHeader.split('Bearer ')[1];
                    console.log('JWT Token:', token);
                } else {
                    console.error('Authorization header not found in the response.');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <label className='label'>
                    <span className='label-text'>Username</span>
                </label>
                <span>
                    {inputUsername}
                </span>

                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <span>
                    {inputPassword}
                </span>

                <button className='btn btn-active btn-primary mt-4' type='submit'>
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginFormModal;
