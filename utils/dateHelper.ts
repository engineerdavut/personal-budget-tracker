import { format, parseISO } from 'date-fns';

export const formatDate = (date: string): string => {
  return format(parseISO(date), 'dd MMM yyyy');
};
