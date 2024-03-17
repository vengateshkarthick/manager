import React from "react";
import { ICheckbox } from "./type";

function Checkbox({ label, id, onChecked, isChecked, className }: ICheckbox) {
  return (
    <div
      className={`relative flex justify-start items-center gap-2 w-auto h-auto   ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        className="cursor-pointer h-[16px] w-[16px] font-normal border-none focus:border focus:border-blue-700 outline-none"
        onChange={(e) => {
          onChecked(e.target.checked);
        }}
        value={isChecked.toString()}
        checked={isChecked}
      />
      {label && <label className="text-sm font-normal font-[Poppins] w-auto" htmlFor={id}>{label}</label>}
    </div>
  );
}

export default Checkbox;