import React, { useRef, useState } from "react";
import dropdownIcon from "../../assets/dropdown.svg";
import { IDropdown } from "./type";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { conjuctStrings } from "../../shared/display";
import useOutsideClickHandler from "../../shared/hooks/useOutsideHandler";

function Dropdown({
  selected,
  options,
  onSelect,
  isMultiSelect = false,
  label,
  size = "md",
  className = " ",
  dropDownClassName = " ",
  error = " ",
}: IDropdown) {
  const [selectedOption, setSelectedOption] = useState<
    { id: string; label: string }[]
  >([]);

  React.useEffect(() => {
   setSelectedOption(selected || [])
  }, [selected])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (
    option: IDropdown["options"][0],
    isChecked: boolean
  ) => {
    const opt = [...selectedOption];
    if (isChecked) {
      if (isMultiSelect) {
        opt.push(option);
      }
      else {
        opt.splice(0, 1);
        opt.push(option)
      }
    }
    else {
      const idx = opt?.findIndex((opt) => opt.id === option.id)
      opt.splice(idx, 1);
    }

    setSelectedOption(() => [...opt]);

    if (!isMultiSelect) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  React.useEffect(() => {
    if (!isDropdownOpen) {
      onSelect(selectedOption);
    }
  }, [isDropdownOpen]);

  const optionsLabel = selectedOption?.map((item) => item.label);

  // closing the dropdown once clicked outside the component
  useOutsideClickHandler(ref, () => isMultiSelect && setIsDropdownOpen(false));

  const dropdownPosition = React.useMemo(() => {
    if (btnRef.current) {
      const area = btnRef.current.getBoundingClientRect();
      return { top: `${area.top + 10}px` };
    }
  }, [btnRef?.current]);
  return (
    <div className={`relative inline-block text-left w-auto ${className}`} ref={ref}>
      
      <div className="h-6 w-full flex justify-start gap-2 items-center" ref={btnRef}>
      {label && (
        <div className="text-sm font-normal w-auto font-[Poppins] text-nowrap">{label}</div>
      )}
        <Button
          label={conjuctStrings(optionsLabel) || "Select Option"}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          icon={dropdownIcon}
          variant="outlined"
          code="primary"
          size={size}
          noTranistion
        />
        {error?.length && (
        <div className="text-sm font-normal w-auto font-[Poppins] text-nowrap">{error}</div>
      )}
      </div>

      {isDropdownOpen && (
        <div
          className={`absolute h-48 z-20 overflow-y-auto top-10 flex flex-col gap-2 justify-start py-2 items-center w-full rounded-md shadow-2xl bg-white ring-black ring-opacity-5 ${dropDownClassName}`}
          role="menu"
          // style={dropdownPosition}
        >
          {options.map((option) => (
            <Checkbox
              label={option.label}
              className="p-2 ps-3 w-full text-sm"
              onChecked={(isChecked) => handleOptionClick(option, isChecked)}
              isChecked={
                !!selectedOption.find(({ id }) => id === option.id) || false
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;