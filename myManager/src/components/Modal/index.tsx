import React from "react";
import closeIcon from "../../assets/close.svg";
import { IModal } from "./type";
import Button from "../Button";

function ConfirmationModal({
  header,
  subText,
  onClose,
  handleConfirm,
  open,
}: IModal) {
  return (
    open && (
      <div className="bg-[#ffffff66] h-full w-full absolute z-20">
        <div
          role="dialog"
          className="transition-all h-auto w-[35vw]  border border-emerald-300 rounded-md shadow-xl absolute m-auto top-[22%] left-[30%] flex flex-col p-4 items-center justify-start   bg-[#fff]"
        >
          {/* <button type="button" onClick={onClose} className="absolute right-3 top-[3px] p-2 rounded-full border border-[#fff] hover:bg-emerald-300">
            <img
              src={closeIcon}
              alt="close"
              className=""
              height={20}
              width={20}
            />
          </button> */}
          <div className="text-sm font-normal w-full text-left text-balance my-3 text-emerald-400">{header}</div>
          {subText && <div className="text-sm text-emerald-400">{subText}</div>}
          <div className="relative flex justify-end gap-4 w-full my-3">
            <Button 
              code="danger"
              variant="outlined"
              onClick={onClose}
              label="Cancel"
            />
            <Button
              code="success"
              variant="filled"
              onClick={handleConfirm}
              label="Confirm"
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationModal;