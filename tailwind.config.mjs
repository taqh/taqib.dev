/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-literata)", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        card: "hsl(var(--card))",
        input: "hsl(var(--input))",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: "hsl(var(--accent))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      typography: ({ theme }) => ({
        taqib: {
          css: {
            "--tw-prose-body": "hsl(var(--muted-foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-lead": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--foreground))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--foreground))",
            "--tw-prose-bullets": "hsl(var(--foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-code-bg": "hsl(var(--card))",
            "--tw-prose-pre-code": theme("colors.zinc.100"),
            "--tw-prose-pre-bg": theme("colors.zinc.800"),
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",
            "code:not(pre code)": {
              color: "var(--tw-prose-code)",
              backgroundColor: "var(--tw-prose-code-bg)",
              borderRadius: "0.375rem",
              paddingInline: "0.275rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              display: "inline-block",
            },
          },
        },
        DEFAULT: {
          css: {
            a: {
              fontWeight: "normal",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
              "&:hover": {
                color: "hsl(var(--accent))",
                textDecoration: "underline",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
