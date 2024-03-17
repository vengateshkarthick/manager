export interface IButton {
    variant: "filled" | "ghost" | "outlined";
    code: "primary" | "danger" | "success";
    className?: string;
    onClick: () => void;
    disabled?: boolean;
    size?: "md" | "lg" | "xl" | "xs" | "sm";
    icon?: string;
    label?: string;
    isSubmitBtn?: boolean
    noTranistion?: boolean
  }
  