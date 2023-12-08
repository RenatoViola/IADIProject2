import { useEffect, useState } from "react";
import "./AvailabilityCalendar.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day, DayRange, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import { Period } from "../../models";
import { useSelector } from "react-redux";
import { State } from "../../store/index";
import axios from "axios";
import user from "../../store/user";


type CustomDayClassNameItem = Day & { className: string };

type Props = {
  id: string,
  closeModal: () => void;
  name: string;
};

const AvailabilityCalendar: React.FC<Props> = ({ id, name, closeModal }) => {

  const userData = useSelector((state: State) => state.user);

  const [selectedDays, setSelectedDays] = useState<CustomDayClassNameItem[]>([]);
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const [priceByNight, setPriceByNight] = useState<number>(0);

  useEffect(() => {
    fetch(`http://localhost:8080/apartments/${id}/calendar`)
      .then(response => response.json())
      .then(data => {
        const periods: Period[] = data.map((p: { startDate: string; endDate: string; }) => ({
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate)
        }));

        setSelectedDays(generateSelectedDays(periods));
      });
      fetch(`http://localhost:8080/apartments/${id}`)
      .then(response => response.json())
      .then(data => {
        setPriceByNight(data.pricePerNight); // Assuming the API returns an object with priceByNight property
      });
  },[id]);

  const generateSelectedDays = (periods: Period[]) => {
    const days: CustomDayClassNameItem[] = [];

    periods.forEach(period => {
      let currentDate = period.startDate;
      const endDate = period.endDate;

      while (currentDate <= endDate) {
        days.push({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
          className: 'greenDay'
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return days;
  };

  const formatDate = (date: Day | null | undefined) => {
    if (!date) return 'Not selected';
  
    const paddedMonth = String(date.month).padStart(2, '0');
    const paddedDay = String(date.day).padStart(2, '0');
    return `${date.year}-${paddedMonth}-${paddedDay}`;
  };

  const [count, setCount] = useState(1);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    }

    const decrement = () => {
        setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    }

    const calculateTotalPrice = (range: DayRange, count: number, rate: number | null) => {
      if (!range.from || !range.to || rate === null) return 0;
    
      const fromDate = new Date(range.from.year, range.from.month - 1, range.from.day);
      const toDate = new Date(range.to.year, range.to.month - 1, range.to.day);
    
      // Calculate the difference in milliseconds and convert to days
      const diffInTime = toDate.getTime() - fromDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
    
      return diffInDays *count* rate;
    };

    const handleBookNow = async () => {
      console.log(userData.token);
      console.log('Book now clicked');
      if (!selectedDayRange.from || !selectedDayRange.to) {
        alert("Please select a date range first.");
        return;
      }
    
      const reservationData = {
        startDate: formatDate(selectedDayRange.from),
        endDate: formatDate(selectedDayRange.to),
        numberOfPeople: count,
        price: calculateTotalPrice(selectedDayRange, count, priceByNight),
        client: {
          username: userData.user?.username,
          email: userData.user?.email,
        },
        apartment: {
          id: id,
          name: name,
        },
      };

      console.log(JSON.stringify(reservationData));
    
      if (!userData.token || !userData.user?.username) {
        alert("You must be logged in to book.");
        return;
      }
    
      try {
        const response = await axios.post(`http://localhost:8080/clients/${userData.user.username}/reservations`, reservationData, {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          }
        });
    
        // Handle successful booking
        console.log('Reservation successful:', response.data);
        closeModal();
      } catch (error) {
        // Handle errors
        console.error('Error making reservation:', error);
        // Further error handling here
        
      }
    };
    

  return (
    
    <div className="flex flex-col justify-center items-center mt-4 text-black">
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        minimumDate={utils("en").getToday()}
        shouldHighlightWeekends
        customDaysClassName={selectedDays}
      />
      <div className='flex flex-row'>
          <div className='flex items-center mt-4'>
              <label><strong>Number of people:</strong></label>
              <button 
                  onClick={decrement} 
                  className={`w-8 h-8 flex items-center justify-center rounded-full ml-4 text-white ${count === 1 ? 'cursor-not-allowed' : 'bg-blue-500'}`}
                  disabled={count === 1}
              >
                  -
              </button>
              <span className="text-lg">{count}</span>
                  <button 
                      onClick={increment} 
                      className="w-8 h-8 ml-2 bg-blue-500 text-white flex items-center justify-center rounded-full">
                      +
                  </button>
          </div>
      </div>
      <div className="flex flex-row items-center mt-4">
        <span className="mr-6"><strong>From:</strong> {formatDate(selectedDayRange.from)}</span>
        <span><strong>To:</strong> {formatDate(selectedDayRange.to)}</span>
      </div>
      <div className="flex flex-row items-center mt-4">
        <label><strong>Total price:</strong></label>
        <span className="ml-4">
          {selectedDayRange.from && selectedDayRange.to ? calculateTotalPrice(selectedDayRange, count, priceByNight) : 0} $
        </span>
      </div>
      <div className="flex flex-row justify-center w-full ml-2">
        <button className="btn btn-primary mt-4 w-full" onClick={handleBookNow}>
          Book now
        </button>
      </div>
    </div>

  );
};

export default AvailabilityCalendar;
