import { useEffect, useState } from "react";
import "../App.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, Day, DayRange, utils } from "react-modern-calendar-datepicker";
import { Period } from "../models";

type CustomDayClassNameItem = Day & { className: string };

const AvailabilityCalendar = () => {

  // const [availabilityPeriods, setPeriods] = useState<Period[]>([]);
  const [selectedDays, setSelectedDays] = useState<CustomDayClassNameItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/apartments/1/calendar')
    // fetch('/periods.json')
      .then(response => response.json())
      .then(data => {
        const periods: Period[] = data.map((p: { startDate: string; endDate: string; }) => ({
          startDate: new Date(p.startDate),
          endDate: new Date(p.endDate)
        }));

        // setPeriods(periods);
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
          month: currentDate.getMonth() + 1, // JavaScript months are 0-indexed
          day: currentDate.getDate(),
          className: 'greenDay'
        });
        // Move to the next day
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
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      minimumDate={utils("en").getToday()}
      shouldHighlightWeekends
      customDaysClassName={selectedDays}
    />
  );
};

export default AvailabilityCalendar;
