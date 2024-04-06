export interface ICalendar {
    onSelect: (value: string) => void;
    date: string;
    label: string;
    allowPast?: boolean;
    error?: string;
  }