import React from 'react';
import { ICalendar } from './type';

function CalendarPicker ({ onSelect, date, label, dontAllowPast = true }: ICalendar) {
    const handleChange = (selectedDate:string) => {
     const date = new Date(selectedDate).toISOString().slice(0, 10);
     onSelect(date);
    }
    return (
      <div className="w-auto h-auto flex flex-col gap-2 justify-center items-start">
        <div className="first-letter:uppercase text-sm font-normal">{label}</div>
        <input
          type="date"
          id="date-calendar"
          className="p-3 font-[Poppins] border text-sm rounded border-neutral-300 cursor-pointer outline-none focus:border-2  focus:border-blue-700"
          onChange={e => handleChange(e.target.value)}
          value={date}
          min={dontAllowPast ? new Date().toISOString().slice(0, 10) : undefined}
          placeholder='Select Date'
        />
      </div>
    )
}

export default CalendarPicker;