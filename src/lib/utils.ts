import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Options = {
  currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
  notation?: Intl.NumberFormatOptions['notation'];
};

type FormatPrice = (price: number | string, options?: Options) => string;

export const formatPrice: FormatPrice = (price, options = {}) => {
  const { currency = 'USD', notation = 'compact' } = options;

  const price2 = typeof price === 'string' ? parseFloat(price) : price;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2
  });

  return formatter.format(price2);
};
