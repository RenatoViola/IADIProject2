import React, { useState } from 'react';
import AvailabilityCalendar from './AvailabilityCalendar/AvailabilityCalendar';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';

interface CalendarModalProps {
    id: string,
    name: string;
    closeModal: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({ id, name, closeModal}) => {
    return (
        <div className='modal modal-open'>
            <div className='modal-box'>
                <div className='modal-action'>
                    <button className='btn' onClick={closeModal}>
                        x
                    </button>
                </div>
                <h3 className='flex justify-center text-lg font-bold'>Book you reservation</h3>
                <AvailabilityCalendar 
                    id={id} 
                    closeModal={closeModal}
                    name={name}
                />
            </div>
        </div>
    );
}

export default CalendarModal;