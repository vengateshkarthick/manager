

export interface IModal {
    handleConfirm: () => void;
    header: string;
    subText?: string;
    onClose: () => void;
    open: boolean;
  }