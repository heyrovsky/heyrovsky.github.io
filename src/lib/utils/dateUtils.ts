import { format, formatDistanceToNow } from 'date-fns';
import { DATE_FORMATS } from '../constants';

export const formatDate = (date: Date): string => {
  return format(date, DATE_FORMATS.DISPLAY_DATE);
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatPublicationDate = (date: string | Date): string => {
  return format(new Date(date), DATE_FORMATS.RELATIVE_DATE);
};