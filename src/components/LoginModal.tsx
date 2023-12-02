import React from 'react';
import LoginForm from '../forms/LoginForm';

interface LoginModalProps {
    closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
    return (
        <div className='modal modal-open'>
            <div className='modal-box'>
                <h3 className='text-lg font-bold'>Login</h3>
                <LoginForm/>
                <div className='modal-action'>
                    <button className='btn' onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
