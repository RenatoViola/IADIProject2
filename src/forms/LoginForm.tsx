import React, {  } from 'react';
import useInput from '../utils';
import { useAppDispatch, useUserSelector } from '../store/hooks';
import { loadUser, logout } from '../store/user';
import { useNavigate } from 'react-router-dom';


interface LoginModalProps {
    closeModal: () => void;
}

const LoginFormModal: React.FC<LoginModalProps> = ({ closeModal }) => {

    const [inputUsername, username, setUsername] = useInput("", "Insert username", "text", "input input-bordered w-full max-w-xs");
    const [inputPassword, password, setPassword] = useInput("", "Insert password", "password", "input input-bordered w-full max-w-xs");
    
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(loadUser(username, password));

        closeModal()
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
