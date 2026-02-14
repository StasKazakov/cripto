import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        euclid: ["var(--font-euclid)", "sans-serif"], 
      },
    },
  },
} satisfies Config;
