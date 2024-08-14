import type { Config } from 'tailwindcss';

import plugin from 'tailwindcss/plugin';

import { PluginUtils } from './app/(shared)/types/common.types';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',

      // xsOnly: { max: '479.98px' },
      // smOnly: { max: '767.98px' },
      // mdOnly: { min: '768px', max: '1279.98px' },
      // notXl: { max: '1279.98px' },
    },

    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          xl: '2.5rem',
          xxl: '6rem',
        },
      },

      colors: {
        black: '#0A0A0A',
        grey: '#D5D4DF',
        blue: '#6096ba',
        'navy-blue': '#006494',
        yellow: '#F7D747',
        light: '#edf2f4',
        white: '#FAFAFA',
        red: '#ef233c',
      },

      fontFamily: {
        nunito: ['var(--font-nunito)'],
        comfortaa: ['var(--font-comfortaa)'],
      },

      dropShadow: {
        xl: 'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25)',
      },

      fontSize: {
        // ----------------------------- LIGHT -----------------------------
        ui_light_16: [
          '16px',
          {
            lineHeight: '1.33',
            fontWeight: '300',
          },
        ],

        ui_light_18: [
          '18px',
          {
            lineHeight: '1.33',
            fontWeight: '300',
          },
        ],

        ui_light_20: [
          '20px',
          {
            lineHeight: '1.33',
            fontWeight: '300',
          },
        ],

        ui_light_28: [
          '28px',
          {
            lineHeight: '1.33',
            fontWeight: '300',
          },
        ],

        // ----------------------------- REGULAR -----------------------------

        ui_reg_16: [
          '16px',
          {
            lineHeight: '1.14',
            fontWeight: '400',
          },
        ],

        ui_reg_18: [
          '18px',
          {
            lineHeight: '1.14',
            fontWeight: '400',
          },
        ],

        ui_reg_20: [
          '20px',
          {
            lineHeight: '1.14',
            fontWeight: '400',
          },
        ],

        ui_reg_28: [
          '28px',
          {
            lineHeight: '1.14',
            fontWeight: '400',
          },
        ],

        ui_reg_32: [
          '32px',
          {
            lineHeight: '1.14',
            fontWeight: '400',
          },
        ],

        // ----------------------------- BOLD -----------------------------

        ui_bold_18: [
          '18px',
          {
            lineHeight: '1.14',
            fontWeight: '700',
          },
        ],

        ui_bold_20: [
          '20px',
          {
            lineHeight: '1.14',
            fontWeight: '700',
          },
        ],

        ui_bold_28: [
          '28px',
          {
            lineHeight: '1.14',
            fontWeight: '700',
          },
        ],

        ui_bold_32: [
          '32px',
          {
            lineHeight: '1.14',
            fontWeight: '700',
          },
        ],

        ui_bold_44: [
          '44px',
          {
            lineHeight: '1.14',
            fontWeight: '700',
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }: PluginUtils) {
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
  ],
};
export default config;
