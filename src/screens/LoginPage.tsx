import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';

const LoginPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="p-4 text-center">
                <h1 className='text-7xl font-bold mb-4 '>Welcome to IADI Booking App</h1>
                <p className='text-xl mb-4'>Your journey begins here. Find and book your accommodation.</p>
                <button className='btn btn-active btn-primary mt-4' onClick={() => setIsOpen(true)}>
                    Login
                </button>
                {isOpen && <LoginModal closeModal={() => setIsOpen(false)} />}
            </div>
        </div>

    );
}

export default LoginPage;