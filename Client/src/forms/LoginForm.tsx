import React, { useState } from 'react';
import useInput from '../utils';
import { useAppDispatch, useUserSelector } from '../store/hooks';
import { loadUser, logout } from '../store/user';
import { useNavigate } from 'react-router-dom';


interface LoginModalProps {
    closeModal: () => void;
}

const LoginFormModal: React.FC<LoginModalProps> = ({ closeModal }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(loadUser(username, password));

        closeModal()
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-control text-left'>
                <label className='label'>
                    <span className='label-text'>Username</span>
                </label>
                <input
                    type='text'
                    className='input input-bordered'
                    placeholder='Insert username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <input
                    type='password'
                    className='input input-bordered'
                    placeholder='Insert password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='btn btn-active btn-primary mt-4 inline-block' type='submit'>
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginFormModal;
