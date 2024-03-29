export interface ICalendar {
    onSelect: (value: string) => void;
    date: string;
    label: string;
    dontAllowPast?: boolean;
    error?: string;
  }