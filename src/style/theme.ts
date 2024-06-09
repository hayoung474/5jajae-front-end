import type { DefaultTheme } from 'styled-components';

export const fontStyle = {
  title_1: 'font-size: 36px;\nline-height: 48px;',
  title_2: 'font-size: 28px;\nline-height: 38px;',
  title_3: 'font-size: 24px;\nline-height: 32px;',
  heading_1: 'font-size: 20px;\nline-height: 28px;',
  heading_2: 'font-size: 18px;\nline-height: 26px;',
  body_1: 'font-size: 16px;\nline-height: 24px;',
  label_1: 'font-size: 14px;\nline-height: 20px;',
  label_2: 'font-size: 13px;\nline-height: 18px;',
  caption_1: 'font-size: 12px;\nline-height: 16px;',
  caption_2: 'font-size: 11px;\nline-height: 14px;',
};

export const fontWeight = {
  bold: 'font-weight:700',
  medium: 'font-weight:500',
  regular: 'font-weight:400',
};

export const colors = {
  /** #FFFFFF */
  white: '#FFFFFF',
  /** #000000 */
  black: '#000000',
  /** #F9FAFB */
  cool_gray_50: '#F9FAFB',
  /** #F3F4F6 */
  cool_gray_100: '#F3F4F6',
  /** #E5E7EB*/
  cool_gray_200: '#E5E7EB',
  /** #D1D5DB */
  cool_gray_300: '#D1D5DB',
  /** #9CA3AF */
  cool_gray_400: '#9CA3AF',
  /** #6B7280 */
  cool_gray_500: '#6B7280',
  /** #4B5563 */
  cool_gray_600: '#4B5563',
  /** #374151 */
  cool_gray_700: '#374151',
  /** #1F2937 */
  cool_gray_800: '#1F2937',
  /** #111827 */
  cool_gray_900: '#111827',
  /** #030712 */
  cool_gray_950: '#030712',
  /** #F4F3FF */
  violet_50: '#F4F3FF',
  /** #EBE9EF */
  violet_100: '#EBE9EF',
  /** #EBE9FE */
  violet_200: '#EBE9FE',
  /** #D8D6FE */
  violet_300: '#D8D6FE',
  /** #BEB5FD */
  violet_400: '#BEB5FD',
  /** #9B8AFB */
  violet_500: '#9B8AFB',
  /** #7D5EF7 */
  violet_600: '#7D5EF7',
  /** #5A27DA */
  violet_700: '#5A27DA',
  /** #4C20B7 */
  violet_800: '#4C20B7',
  /** #3E1C96 */
  violet_900: '#3E1C96',
  /** #251065 */
  violet_950: '#251065',
};

export type ColorsType = typeof colors;
export type FontStyleType = typeof fontStyle;
export type FontWeightType = typeof fontWeight;

export interface ThemeType {
  colors: ColorsType;
  fontStyle: FontStyleType;
  fontWeight: FontWeightType;
}

/* 타입스크립트에서 DefaultTheme를 사용하려면 interface를 선언해주어야 한다. 아니면 theme가 any타입으로 나오게 된다. */
declare module 'styled-components' {
  interface DefaultTheme extends ThemeType {}
}

export const theme: DefaultTheme = {
  fontStyle,
  colors,
  fontWeight,
};
