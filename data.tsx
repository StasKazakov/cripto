export const secondsMap: Record<string, number> = {
  '1H': 3600,
  '6H': 21600,
  '1D': 86400,
  '1W': 604800,
  '1M': 2592000,
  'All': 9999999999
};

export const rangeLabels: Record<string, string> = {
    '1H': 'Hour',
    '6H': '6 Hours',
    '1D': 'Day',
    '1W': 'Week',
    '1M': 'Month',
    'All': 'Total'
};

export interface Transaction {
  timeStamp: string;
  value: string;
  to: string;
  from: string;
  gasUsed: string;
  gasPrice: string;
}