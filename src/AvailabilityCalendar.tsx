import React, { useState } from "react";
import "./App.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Calendar, DayRange, DayValue, utils } from "react-modern-calendar-datepicker";
import { Period } from "./models";

const AvailabilityCalendar = () => {

  const availabilityPeriods: Period[] = [
    { startDate: new Date(2023, 11, 2), endDate: new Date(2023, 11, 10) }, // December is month 11 (0-indexed)
    { startDate: new Date(2023, 11, 15), endDate: new Date(2023, 11, 20) },
    { startDate: new Date(2024, 0, 5), endDate: new Date(2024, 0, 15) }, // January is month 0
    // ... more periods
  ];

  const generateSelectedDays = (periods: Period[]) => {
    let days: {
      year: number; month: number; // JavaScript months are 0-indexed
      day: number; className: string;
    }[] = [];

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

  const selectedDays = generateSelectedDays(availabilityPeriods);


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
