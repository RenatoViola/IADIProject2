import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import { logout } from '../store/user';
import { useAppDispatch } from '../store/hooks';

const Homepage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="p-4">
                <h1 className='text-2xl font-bold mb-4'>Welcome to IADI Booking App</h1>
                <p className='mb-4'>Your journey begins here. Find and book your accommodation.</p>
                <button className='btn btn-active btn-primary mt-4' onClick={() => setIsOpen(true)}>
                    Login
                </button>
                <button className='btn btn-active btn-primary mt-4' onClick={() => dispatch(logout())}>
                    Logout
                </button>
                {isOpen && <LoginModal closeModal={() => setIsOpen(false)} />}
            </div>
        </>

    );
}

export default Homepage;