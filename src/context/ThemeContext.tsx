import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme, PaletteOptions } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Define theme preferences type
export interface ThemePreferences {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  fontSize: number;
  fontFamily: string;
  reducedMotion: boolean;
  highContrast: boolean;
  density: 'comfortable' | 'compact' | 'standard';
  animationSpeed: 'slow' | 'normal' | 'fast' | 'none';
}

// Define theme context type
interface ThemeContextType {
  themePreferences: ThemePreferences;
  updateThemePreferences: (preferences: Partial<ThemePreferences>) => void;
  resetThemePreferences: () => void;
}

// Default theme preferences
const defaultThemePreferences: ThemePreferences = {
  mode: 'system',
  primaryColor: 'blue',
  fontSize: 16,
  fontFamily: 'Roboto',
  reducedMotion: false,
  highContrast: false,
  density: 'standard',
  animationSpeed: 'normal'
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Primary color options
const primaryColors: Record<string, string> = {
  blue: '#1a73e8',
  green: '#2e7d32',
  purple: '#7b1fa2',
  orange: '#f57c00',
  red: '#d32f2f',
  teal: '#00796b',
  indigo: '#3f51b5',
  pink: '#e91e63',
  deepPurple: '#673ab7',
  cyan: '#00bcd4'
};

// Font family options
const fontFamilies: Record<string, string> = {
  Roboto: 'Roboto, sans-serif',
  Montserrat: 'Montserrat, sans-serif',
  OpenSans: '"Open Sans", sans-serif',
  Lato: 'Lato, sans-serif',
  Poppins: 'Poppins, sans-serif'
};

// Helper function to get animation duration based on speed
function getAnimationDuration(speed: string): number {
  switch (speed) {
    case 'slow': return 0.5;
    case 'normal': return 0.3;
    case 'fast': return 0.15;
    case 'none': return 0;
    default: return 0.3;
  }
}

// Helper function to lighten a color
function lightenColor(hex: string, percent: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Lighten
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Helper function to darken a color
function darkenColor(hex: string, percent: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Darken
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Helper function to get contrast text color (black or white)
function getContrastText(hex: string): string {
  // Convert hex to RGB
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calculate luminance using the formula for relative luminance in the sRGB color space
  // See: https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return white for dark colors and black for light colors
  return luminance > 128 ? '#000000' : '#ffffff';
}

// Helper function to get a complementary color
function getComplementaryColor(hex: string): string {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Get complementary color by inverting the values
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Load saved preferences from localStorage or use defaults
  const loadSavedPreferences = (): ThemePreferences => {
    const savedPreferences = localStorage.getItem('themePreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultThemePreferences;
  };

  const [themePreferences, setThemePreferences] = useState<ThemePreferences>(loadSavedPreferences);

  // Determine if we should use dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDarkMode =
    themePreferences.mode === 'dark' ||
    (themePreferences.mode === 'system' && prefersDarkMode);

  // Create the theme based on preferences
  const theme = React.useMemo(() => {
    // Get the primary color
    const primaryColor = primaryColors[themePreferences.primaryColor] || primaryColors.blue;
    // Adjust colors based on light/dark mode
    const adjustedPrimaryColor = shouldUseDarkMode ? lightenColor(primaryColor, 5) : primaryColor;

    // Create palette options
    const paletteOptions: PaletteOptions = {
      mode: shouldUseDarkMode ? 'dark' : 'light',
      primary: {
        main: adjustedPrimaryColor,
        light: lightenColor(adjustedPrimaryColor, 20),
        dark: darkenColor(adjustedPrimaryColor, 20),
        contrastText: getContrastText(adjustedPrimaryColor),
      },
      secondary: {
        // Create a complementary color for secondary
        main: getComplementaryColor(adjustedPrimaryColor),
        light: lightenColor(getComplementaryColor(adjustedPrimaryColor), 20),
        dark: darkenColor(getComplementaryColor(adjustedPrimaryColor), 20),
        contrastText: getContrastText(getComplementaryColor(adjustedPrimaryColor)),
      },
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
      },
      info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark: '#01579b',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      ...(themePreferences.highContrast && {
        text: {
          primary: shouldUseDarkMode ? '#ffffff' : '#000000',
          secondary: shouldUseDarkMode ? '#e0e0e0' : '#333333',
        },
        background: {
          default: shouldUseDarkMode ? '#000000' : '#ffffff',
          paper: shouldUseDarkMode ? '#121212' : '#ffffff',
        },
        contrastThreshold: 4.5,
      }),
      ...(!themePreferences.highContrast && shouldUseDarkMode && {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      }),
    };

    // Create the theme
    return createTheme({
      palette: paletteOptions,
      typography: {
        fontSize: themePreferences.fontSize,
        fontFamily: fontFamilies[themePreferences.fontFamily] || fontFamilies.Roboto,
        h1: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 700,
        },
        h2: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 600,
        },
        h3: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 600,
        },
        h4: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 600,
        },
        h5: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 500,
        },
        h6: {
          fontFamily: themePreferences.fontFamily === 'Roboto'
            ? fontFamilies.Montserrat
            : fontFamilies[themePreferences.fontFamily],
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: themePreferences.density === 'compact' ? '4px 12px' : '8px 16px',
              transition: themePreferences.reducedMotion
                ? 'none'
                : `all ${getAnimationDuration(themePreferences.animationSpeed)}s ease`,
              ...(themePreferences.reducedMotion || themePreferences.animationSpeed === 'none'
                ? {}
                : {
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                  }
              ),
            },
            containedPrimary: {
              background: `linear-gradient(45deg, ${adjustedPrimaryColor} 30%, ${lightenColor(adjustedPrimaryColor, 20)} 90%)`,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: themePreferences.reducedMotion
                ? 'none'
                : `transform ${getAnimationDuration(themePreferences.animationSpeed)}s ease, box-shadow ${getAnimationDuration(themePreferences.animationSpeed)}s ease`,
              ...(themePreferences.reducedMotion || themePreferences.animationSpeed === 'none'
                ? {}
                : {
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
                    },
                  }
              ),
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: themePreferences.density === 'compact'
                ? '8px 12px'
                : themePreferences.density === 'comfortable'
                  ? '16px 24px'
                  : '12px 16px',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              padding: themePreferences.density === 'compact'
                ? '4px 8px'
                : themePreferences.density === 'comfortable'
                  ? '12px 16px'
                  : '8px 12px',
            },
          },
        },
      },
    });
  }, [themePreferences, shouldUseDarkMode]);

  // Update theme preferences
  const updateThemePreferences = (preferences: Partial<ThemePreferences>) => {
    setThemePreferences(prev => {
      const newPreferences = { ...prev, ...preferences };
      localStorage.setItem('themePreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };

  // Reset theme preferences to defaults
  const resetThemePreferences = () => {
    setThemePreferences(defaultThemePreferences);
    localStorage.setItem('themePreferences', JSON.stringify(defaultThemePreferences));
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (themePreferences.mode === 'system') {
        // Force a re-render when system theme changes
        setThemePreferences(prev => ({ ...prev }));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreferences.mode]);

  return (
    <ThemeContext.Provider value={{ themePreferences, updateThemePreferences, resetThemePreferences }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};



// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
