import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import nodemailer from 'nodemailer';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FormatPrice

type PriceOptions = {
  currency?: 'USD' | 'EUR' | 'GBP' | 'BDT';
  notation?: Intl.NumberFormatOptions['notation'];
};

type FormatPrice = (price: number | string, options?: PriceOptions) => string;

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

// SendEmail

type EmailOptions = { host: string; user: string; pass: string };

export const sendEmail = ({}) => {
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.qq.com', // 第三方邮箱的主机地址
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: '1804610117@qq.com', // 发送方邮箱的账号
  //     pass: 'ltoijznrfrobdbig' // 邮箱授权密码
  //   }
  // });
};
