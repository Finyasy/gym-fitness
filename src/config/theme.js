// Extreme Fitness Centre Theme Configuration
// Theme Color: Blue
// Slogan: Stronger Every Day

export const theme = {
  // Brand Information
  brand: {
    name: 'Extreme Fitness Centre',
    shortName: 'Extreme Fitness',
    slogan: 'Stronger Every Day',
  },

  // Color Palette
  colors: {
    primary: '#0066CC',      // Primary Blue
    dark: '#004C99',         // Dark Blue
    light: '#3399FF',        // Light Blue
    accent: '#00AAFF',       // Accent Blue
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
  },

  // Typography
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },

  // Breakpoints for Responsive Design
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },

  // Border Radius
  borderRadius: {
    small: '5px',
    medium: '10px',
    large: '15px',
    round: '50px',
    circle: '50%',
  },

  // Shadows
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 8px 15px rgba(0, 0, 0, 0.2)',
    blue: '0 4px 15px rgba(0, 170, 255, 0.4)',
  },

  // Transitions
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

export default theme;
