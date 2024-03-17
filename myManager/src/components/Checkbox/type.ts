export interface ICheckbox {
    label?: string;
    onChecked: (isChecked:  boolean) => void;
    className?: string;
    id?: string;
    isChecked: boolean;
  }