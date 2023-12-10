import React from 'react';
import { Reservation } from '../models';
import ReviewForm from '../forms/ReviewForm';

interface ReviewModalProps {
    reservation: Reservation,
    closeModal: () => void;
};

const CalendarModal: React.FC<ReviewModalProps> = ({ reservation, closeModal}) => {
    return (
        <div className='modal modal-open'>
            <div className='modal-box'>
                <div className='modal-action'>
                    <button className='btn' onClick={closeModal}>
                        x
                    </button>
                </div>
                <h3 className='flex justify-center text-lg font-bold'>Rate your stay</h3>
                <ReviewForm 
                    reservation={reservation} 
                    closeModal={closeModal}
                />
            </div>
        </div>
    );
}

export default CalendarModal;