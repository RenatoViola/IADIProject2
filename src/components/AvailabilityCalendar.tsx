import { useEffect, useState } from "react";
import "../App.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day, DayRange, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import { Period } from "../models";

type CustomDayClassNameItem = Day & { className: string };

type Props = {
  id: string,
  closeModal: () => void;
};

const AvailabilityCalendar: React.FC<Props> = ({ id, closeModal }) => {

  const [selectedDays, setSelectedDays] = useState<CustomDayClassNameItem[]>([]);

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
  }, []);

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

  // a change in default state: { from: ..., to: ... }
  const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
    from: null,
    to: null
  });

  return (
    <>
      <Calendar
        value={selectedDayRange}
        onChange={setSelectedDayRange}
        minimumDate={utils("en").getToday()}
        shouldHighlightWeekends
        customDaysClassName={selectedDays}
      />
      <button className="btn" onClick={closeModal}>
        CLOSE CALENDAR
      </button>
    </>

  );
};

export default AvailabilityCalendar;
