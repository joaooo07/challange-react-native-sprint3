import React, { createContext, useContext, useState } from "react";
import {
  NavigationContainer,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Image,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { useTranslation } from "react-i18next";

import Login from "@/screens/Login";
import Home from "@/screens/Home";
import PatiosList from "@/screens/PatioList";
import PatioMap from "@/screens/PatioMap";
import FormEntry from "@/screens/FormEntry";
import Preferences from "@/screens/Preferences";
import Register from "@/screens/Register";
import Users from "@/screens/Users";
import Units from "@/screens/Units";

import { LightTheme, DarkTheme as CustomDarkTheme } from "@/theme";

type ThemeContextType = {
  isDark: boolean;
  theme: NavigationTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? CustomDarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme deve ser usado dentro do ThemeProvider");
  return ctx;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PatioList: undefined;
  PatioMap: { patioId: string };
  FormEntry: { slotId: string; patioId: string };
  Preferences: undefined;
  Register: undefined;
  Users: undefined;
  Units: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <ThemeProvider>
      <NavigationWrapper />
    </ThemeProvider>
  );
}

function NavigationWrapper() {
  const { theme, isDark, toggleTheme } = useAppTheme();

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"pt" | "en" | "es">("pt");
  const { i18n } = useTranslation();

  const openLanguageModal = () => setLanguageModalVisible(true);
  const closeLanguageModal = () => setLanguageModalVisible(false);

  const handleLanguageSelect = (lang: "pt" | "en" | "es") => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    closeLanguageModal();
  };

  const getFlagSource = (lang: string) => {
    switch (lang) {
      case "pt":
        return require("../../assets/brasil.png");
      case "en":
        return require("../../assets/eua.png");
      case "es":
        return require("../../assets/mexico.png");
      default:
        return require("../../assets/globo.png");
    }
  };

  const renderHeaderRight = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleTheme} style={{ paddingRight: 10 }}>
        <Image
          source={
            isDark ? require("../../assets/modo-escuro.png") : require("../../assets/modo-claroo.png")
          }
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={openLanguageModal} style={{ paddingRight: 10 }}>
        <Image
          source={getFlagSource(selectedLanguage)}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <Modal
        visible={languageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeLanguageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageMenu}>
            {["pt", "en", "es"].map((lang) =>
              lang === selectedLanguage ? null : (
                <Pressable
                  key={lang}
                  onPress={() => handleLanguageSelect(lang as "pt" | "en" | "es")}
                >
                  <Image source={getFlagSource(lang)} style={styles.flag} />
                </Pressable>
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.primary,
          headerTitle: () => (
            <Image
              source={require("../../assets/logo.png")} 
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerRight: renderHeaderRight,
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PatioList" component={PatiosList} />
        <Stack.Screen name="PatioMap" component={PatioMap} />
        <Stack.Screen name="FormEntry" component={FormEntry} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="Register" component={Register} options={{ title: "Cadastro" }} />
        <Stack.Screen name="Users" component={Users} options={{ title: "Usuários" }} />
        <Stack.Screen name="Units" component={Units} options={{ title: "Unidades" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 50,
    paddingRight: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  languageMenu: {
    backgroundColor: "#00A859",
    padding: 10,
    borderRadius: 10,
    elevation: 6,
    width: 56,
    alignItems: "center",
  },
  flag: {
    width: 24,
    height: 24,
    marginVertical: 8,
  },
});
