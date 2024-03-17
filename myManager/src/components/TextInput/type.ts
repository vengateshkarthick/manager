export interface ITextArea {
    onTextInputChange: (value: string) => void;
    value: string;
    className?: string;
    key?: string;
    placeholderText?: string;
    label?: string
    height?: number
  }