// src/theme/index.ts
import { Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#00A859",
    background: "#FFFFFF",
    card: "#F2F2F2",
    text: "#000000",
    border: "#DDDDDD",
    notification: "#FF3B30",
  },
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "",
      fontWeight: "normal"
    },
    bold: {
      fontFamily: "",
      fontWeight: "normal"
    },
    heavy: {
      fontFamily: "",
      fontWeight: "normal"
    }
  }
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#00A859",
    background: "#000000",
    card: "#111111",
    text: "#FFFFFF",
    border: "#333333",
    notification: "#FF453A",
  },
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "normal"
    },
    medium: {
      fontFamily: "",
      fontWeight: "normal"
    },
    bold: {
      fontFamily: "",
      fontWeight: "normal"
    },
    heavy: {
      fontFamily: "",
      fontWeight: "normal"
    }
  }
};
