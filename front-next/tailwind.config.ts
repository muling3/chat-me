import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "clay-card":
          "inset -10px -10px 20px hsla(0, 0%, 92%, 1), inset 0 16px 32px hsl(302deg 25% 95%)",
        "clay-btn":
          "16px 16px 32px 0 hsla(0, 0%, 96%, 1), inset -16px -16px 32px 0 hsla(0, 0%, 88%, 1), inset 8px 8px 16px 0 hsla(0, 0%, 96%, 1)",
          neu1: "-5px -5px 15px 2px rgb(0 0 0 / 0.1)",
          neu2: "-5px -5px 10px 2px rgb(0.9 0.9 0.9 / 0.1)",
          innerneu1: "inset -5px -5px 10px 10px rgb(0.9 0.9 0.9 / 0.1)",
          innerneu2: "inset -5px -5px 15px 10px rgb(0 0 0 / 0.1)",
      },
      dropShadow: {
        clay: "35px 35px 35px hsla(0, 0%, 76%, 1)",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config
