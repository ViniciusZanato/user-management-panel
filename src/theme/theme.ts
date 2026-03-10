import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  const colors = {
    text: mode === "dark" ? "#ffffff" : "#000000",
    inputBg: mode === "dark" ? "#404040" : "#e3e3e3",
  };

  const borderRadius = 10;

  return createTheme({
    palette: { mode },

    components: {
      MuiTextField: {
        styleOverrides: {
          root: { borderRadius },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: colors.text,
            "&.Mui-focused": { color: colors.text },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius,
            "& fieldset": { border: "none" },
          },
          input: {
            backgroundColor: colors.inputBg,
            color: colors.text,
            borderRadius,
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            fontSize: "1rem",
            "&:nth-last-of-type(-n+2)": {
              textAlign: "center",
            },
          },
          body: {
            "&:nth-last-of-type(-n+2)": {
              textAlign: "center",
            },
          },
        },
      },
    },
  });
};