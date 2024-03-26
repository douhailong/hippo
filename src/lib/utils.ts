import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import nodemailer from 'nodemailer';
import { SendTemplate } from '../components/emails/send-template';

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

type ParamKey =
  | 'from'
  | 'to'
  | 'subject'
  | 'actionLabel'
  | 'buttonText'
  | 'verificationToken';

type EmailOptions = {
  [K in ParamKey]: string;
};

// export const sendEmail = async ({
//   from,
//   to,
//   subject,
//   actionLabel,
//   buttonText,
//   verificationToken
// }: EmailOptions) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.resend.com',
//     secure: true,
//     port: 465,
//     auth: {
//       user: 'resend',
//       pass: process.env.RESEND_API_KEY
//     }
//   });

//   await transporter.sendMail({
//     from: from ?? 'Hippo@resend.dev',
//     to,
//     subject,
//     html: SendTemplate({
//       actionLabel,
//       buttonText,
//       href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${verificationToken}`
//     })
//   });
// };
