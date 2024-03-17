import React from 'react';
import { ITextArea } from "./type";


function TextArea({
  value,
  onTextInputChange,
  className = '',
  key = '',
  placeholderText = 'search with product name...',
  label = "",
  height,
  ...rest
}: ITextArea & React.InputHTMLAttributes<Omit<HTMLInputElement, "date">>) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value: currentValue },
    } = e;
   onTextInputChange(currentValue);
  };
  return (
    <div className={`grid grid-cols-1 items-center justify-start w-auto gap-2 ${className}`}>
    {label && (
        <div className="col-span-1 text-sm font-normal font-[Poppins] text-nowrap">{label}</div>
      )}
    <div className={` border-2 max-w-[300px]  border-slate-100 my-1 flex w-full flex-col justify-start gap-1 rounded-md bg-white-100 p-2 ${rest.readOnly ? 'oapcity-50 cursor-not-allowed' : 'focus-within:border-blue-700' } `}>
      <input
        key={key}
        type='text'
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={placeholderText}
        className="resize-none w-full rounded-none border-none text-sm placeholder:text-[#767D83] focus:outline-none"
        tabIndex={-1}
        {...rest}
        style={{ height }}
      />
     
    </div>
    </div>
  );
}

export default TextArea;