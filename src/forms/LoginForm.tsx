import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuthLoading, selectAuthError } from '../features/auth/authSlice';


const LoginFormModal: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //toda a lógica do login aqui (pedido à API)
        dispatch(loginUser({username, password}));
    };

    return (
        <form onSubmit={handleSubmit}>
           <div className='form-control'> 
                <label className='label'>
                    <span className='label-text'>Username</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Insert username" 
                    className="input input-bordered w-full max-w-xs"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label className='label'>
                    <span className='label-text'>Password</span>
                </label>
                <input 
                    type="password" 
                    placeholder="Insert password" 
                    className="input input-bordered w-full max-w-xs"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='btn btn-active btn-primary mt-4' type='submit'>
                    Login
                </button>
           </div>
        </form>
    );
};

export default LoginFormModal;
