import React from "react";
import { IButton } from './type'

const constructStyles = ({
  variant = "filled",
  disabled = false,
  code = "primary",
  size = "sm",
  noTranistion,
}: Partial<IButton>) => {
  const pad = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };
  const common = `text-center p-${
    pad[size || "md"]
  } font-normal text-base cursor-pointer focus:outline-none outline-none`;
  const button_variants = {
    primary: {
      filled: "bg-[#1a73e8] text-[#fff] rounded border-1 border-[#1a73e8]",
      outlined:
        "border border-1 rounded border-[#1a73e8] bg-[#fff] text-[#1a73e8]",
      ghost:
        "border-none bg-[#fff] text-[#1a73e8] hover:underline hover:underline-offset-8 hover:decoration-[#1a73e8]",
    },
    danger: {
      filled: "bg-red-500 rounded border-1 border-red-400 text-[#fff]",
      outlined: "border border-1 rounded border-red-400 bg-[#fff] text-red-400",
      ghost:
        "border-none bg-[#fff] text-red-400 hover:underline hover:underline-offset-8 hover:decoration-red-400",
    },
    success: {
      filled:
        "bg-emerald-400  rounded text-white border-1 border-emerald-400 text-[#fff]",
      outlined:
        "border border-1 rounded border-emerald-400 bg-[#fff] text-emerald-400",
      ghost:
        "border-none bg-[#fff] text-emerald-400 hover:underline hover:underline-offset-8 hover:decoration-emerald-400",
    },
  };

  return `${button_variants[code][variant]} ${common} ${
    disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
  } ${disabled || noTranistion   ? " " : "transition ease-in-out delay-150 hover:scale-110"} `;
};
function Button(props: IButton) {
  return (
    <div className="h-auto w-auto">
      <button
        className={constructStyles(props)}
        disabled={props.disabled}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
        tabIndex={-1}
        type={props.isSubmitBtn ? "submit" :"button"}
      >
        <div className="flex justify-center items-center gap-1">
          {props.label && <div className="text-sm truncate w-[100px] max-w-[100px]">{props.label}</div>}
          {props.icon && <img src={props.icon} height={15} width={15} alt="btn-icon"/>}
        </div>
      </button>
    </div>
  );
}

export default Button;