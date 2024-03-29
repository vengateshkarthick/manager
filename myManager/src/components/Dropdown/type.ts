import { IButton } from "../Button/type";

export interface IDropdown {
    options: Array<{id: string, label: string}>;
    onSelect: (selectedOption: {id: string, label: string}[]) => void;
    isMultiSelect?: boolean;
    selected: Array<{id: string, label: string}> | null;
    label?:string;
    size?: IButton['size'];
    className?:string;
    dropDownClassName?:string;
    error?: string;
}
  