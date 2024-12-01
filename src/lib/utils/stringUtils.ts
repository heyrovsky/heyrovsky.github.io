export const capitalize = (str: string): string => {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatSource = (source: string): string => {
  return source
    .replace(/^www\./i, '')
    .replace(/\.com$/i, '')
    .replace(/\.org$/i, '')
    .replace(/\.net$/i, '');
};