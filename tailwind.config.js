/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [{
      lofi: {
        "color-scheme": "light",
        "primary": "#0D0D0D",
        "primary-content": "oklch(100% 0 0)",
        "secondary": "#1A1919",
        "secondary-content": "oklch(100% 0 0)",
        "accent": "#262626",
        "accent-content": "oklch(100% 0 0)",
        "neutral": "#000000",
        "neutral-content": "oklch(100% 0 0)",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#F2F2F2",
        "base-300": "#E6E5E5",
        "base-content": "#000000",
        "info": "oklch(79.54% 0.103 205.9)",
        "success": "oklch(90.13% 0.153 164.14)",
        "warning": "oklch(88.37% 0.135 79.94)",
        "error": "oklch(78.66% 0.15 28.47)",
        "--rounded-box": "0.25rem",
        "--rounded-btn": "0.25rem", // increased
        "--rounded-badge": "0.125rem",
        "--tab-radius": "0.125rem",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1",
      }
    }],
  },
}

