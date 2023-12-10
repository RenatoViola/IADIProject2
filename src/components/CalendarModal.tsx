import React from 'react';
import AvailabilityCalendar from './AvailabilityCalendar/AvailabilityCalendar';
import { Apartment } from '../models';

interface CalendarModalProps {
    apartment: Apartment,
    closeModal: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({ apartment, closeModal}) => {
    return (
        <div className='modal modal-open'>
            <div className='modal-box'>
                <div className='modal-action'>
                    <button className='btn' onClick={closeModal}>
                        x
                    </button>
                </div>
                <h3 className='flex justify-center text-lg font-bold'>Book your reservation</h3>
                <AvailabilityCalendar 
                    apartment={apartment} 
                    closeModal={closeModal}
                />
            </div>
        </div>
    );
}

export default CalendarModal;