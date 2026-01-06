import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        interactive: "rgb(var(--color-interactive) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Geist Sans", "Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-primary))',
            '--tw-prose-headings': 'rgb(var(--color-primary))',
            '--tw-prose-bold': 'rgb(var(--color-primary))',
            '--tw-prose-quotes': 'rgb(var(--color-primary))',
            '--tw-prose-bullets': 'rgb(var(--color-primary))',
            '--tw-prose-counters': 'rgb(var(--color-primary))',
            // Reduce figure/image/caption spacing (Tufte style - tight integration)
            'figure': {
              marginTop: '1em',
              marginBottom: '0',
              textAlign: 'center',
            },
            'figure > img': {
              marginTop: '0',
              marginBottom: '0',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            'figcaption': {
              marginTop: '0.5em',
              marginBottom: '0',
              textAlign: 'center',
            },
            // Paragraph following a figure should have reduced top margin
            'figure + p': {
              marginTop: '0.75em',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-primary))',
            '--tw-prose-headings': 'rgb(var(--color-primary))',
            '--tw-prose-bold': 'rgb(var(--color-primary))',
            '--tw-prose-quotes': 'rgb(var(--color-primary))',
            '--tw-prose-bullets': 'rgb(var(--color-primary))',
            '--tw-prose-counters': 'rgb(var(--color-primary))',
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
