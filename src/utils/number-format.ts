export const formatNumber = (value: number | string): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
