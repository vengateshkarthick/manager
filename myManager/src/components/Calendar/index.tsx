import React from 'react';
import { ICalendar } from './type';

function CalendarPicker ({ onSelect, date, label, allowPast = true, error }: ICalendar) {
    

    const handleChange = (selectedDate:string) => {
     onSelect(new Date(selectedDate).toISOString());
    }
    return (
      <div className="w-auto h-auto flex flex-col gap-2 justify-center items-start">
        <div className="first-letter:uppercase text-sm font-normal">{label}</div>
        <input
          type="date"
          id="date-calendar"
          className="p-3 font-[Poppins] border text-sm rounded border-neutral-300 cursor-pointer outline-none focus:border-2  focus:border-blue-700"
          onChange={e => handleChange(e.target.value)}
          value={date?.slice(0,10)}
          min={"1990-01-01"}
          
         
          placeholder='Select Date'
        />
       { error?.length && <div className="col-span-1 text-sm font-normal font-[Poppins] text-nowrap text-red-500">{error}</div>}
      </div>
    )
}

export default CalendarPicker;