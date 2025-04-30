import { Theme } from '@mui/material/styles';

/**
 * Creates a consistent Paper style for settings components
 * @param theme The current MUI theme
 * @param isHeader Whether this is a header paper (with lighter background)
 * @returns Style object for Paper component
 */
export const createSettingsPaperStyle = (theme: Theme, isHeader: boolean = false) => {
  return {
    p: 3,
    borderRadius: 2,
    bgcolor: isHeader
      ? theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.02)'
      : theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.03)'
        : 'background.paper'
  };
};
