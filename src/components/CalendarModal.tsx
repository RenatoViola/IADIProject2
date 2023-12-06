import React from 'react';
import AvailabilityCalendar from './AvailabilityCalendar/AvailabilityCalendar';

interface CalendarModalProps {
    id: string,
    closeModal: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({ id, closeModal }) => {
    return (
        <div className='modal modal-open'>
            <div className='modal-box'>
                <h3 className='flex justify-center text-lg font-bold'>Calendar</h3>
                <AvailabilityCalendar id={id} closeModal={closeModal}/>
                <div className='modal-action'>
                    <button className='btn' onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarModal;