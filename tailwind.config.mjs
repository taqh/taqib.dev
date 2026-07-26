/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-literata)", ...defaultTheme.fontFamily.serif],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                color: "hsl(var(--accent))",
                textDecoration: "underline",
              },
              fontWeight: "normal",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
            },
          },
        },
        taqib: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground) / 0.78)",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-bullets": "hsl(var(--foreground))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-code-bg": "hsl(var(--muted))",
            "--tw-prose-counters": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-lead": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": theme("colors.zinc.800"),
            "--tw-prose-pre-code": theme("colors.zinc.100"),
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-td-borders": "hsl(var(--border))",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "code:not(pre code)": {
              backgroundColor: "var(--tw-prose-code-bg)",
              borderRadius: "0.375rem",
              boxDecorationBreak: "clone",
              color: "var(--tw-prose-code)",
              display: "inline",
              fontSize: "0.875rem",
              fontWeight: "600",
              overflowWrap: "anywhere",
              paddingInline: "0.275rem",
              WebkitBoxDecorationBreak: "clone",
            },
            h2: {
              fontSize: "1.25rem",
              lineHeight: "1.4",
              marginBottom: "1.25rem",
              marginTop: "3rem",
            },
            h3: {
              fontSize: "1.125rem",
              lineHeight: "1.5",
              marginBottom: "0.5rem",
              marginTop: "2.25rem",
            },
          },
        },
      }),
    },
  },
};
