export const SIGNAL_CATEGORIES = [
  { key: 'retail', label: 'Retail', fullName: 'Retail Signals' },
  { key: 'ipo', label: 'IPO', fullName: 'IPO Signals' },
  { key: 'buyback', label: 'Buyback', fullName: 'Buyback Signals' },
  { key: 'sentiment', label: 'Sentiment', fullName: 'Sentimental Investor Signals' },
  { key: 'exDividend', label: 'Ex-Div', fullName: 'Ex-Dividend Signals' },
  { key: 'income', label: 'Income', fullName: 'Income Investing Signals' },
] as const;

export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number]['key'];
