import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Custom theme for Chinese poetry app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#2c5530", // Deep green inspired by traditional Chinese ink
      light: "#5e8b63",
      dark: "#1a3d1f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b4513", // Saddle brown for traditional feeling
      light: "#c17c54",
      dark: "#5d2f0c",
      contrastText: "#ffffff",
    },
    background: {
      default: "#faf7f0", // Warm paper-like background
      paper: "#ffffff",
    },
    text: {
      primary: "#2c2c2c",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: [
      '"Noto Sans SC"', // Chinese font
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei"',
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    button: {
      textTransform: "none" as const, // Disable uppercase transformation for Chinese text
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#ffffff",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2c5530",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#2c2c2c",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: "8px",
        },
      },
    },
  },
});

export default theme;
