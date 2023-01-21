// images
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.ico'

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }
