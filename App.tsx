import './src/i18n/i18n';
import React, { useState } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import PatiosList from './src/screens/PatioList';
import PatioMap from './src/screens/PatioMap';
import FormEntry from './src/screens/FormEntry';
import Preferences from './src/screens/Preferences';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PatiosList: undefined;
  PatioMap: { patioId: string };
  FormEntry: undefined;
  Preferences: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'pt' | 'en' | 'es'>('pt');
  const { i18n } = useTranslation();

  const openLanguageModal = () => setLanguageModalVisible(true);
  const closeLanguageModal = () => setLanguageModalVisible(false);

  const handleLanguageSelect = (lang: 'pt' | 'en' | 'es') => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang); 
    closeLanguageModal();
  };

 const getFlagSource = (lang: string) => {
  switch (lang) {
    case 'pt':
      return require('./assets/brasil.png');
    case 'en':
      return require('./assets/eua.png');
    case 'es':
      return require('./assets/mexico.png');
    default:
      return require('./assets/globo.png');
  }
};


  const renderHeaderRight = () => (
    <>
      <TouchableOpacity onPress={openLanguageModal} style={{ paddingRight: 10 }}>
        <Image
          source={getFlagSource(selectedLanguage)}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLanguageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageMenu}>
            {['pt', 'en', 'es'].map((lang) => {
              if (lang === selectedLanguage) return null;
              return (
                <Pressable
                  key={lang}
                  onPress={() => handleLanguageSelect(lang as 'pt' | 'en' | 'es')}
                >
                  <Image source={getFlagSource(lang)} style={styles.flag} />
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#00A859',
          headerTitle: () => (
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerRight: renderHeaderRight
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PatiosList" component={PatiosList} options={{ title: 'Selecione o Pátio' }} />
        <Stack.Screen name="PatioMap" component={PatioMap} options={{ title: 'Mapa do Pátio' }} />
        <Stack.Screen name="FormEntry" component={FormEntry} options={{ title: 'Formulário de Entrada' }} />
        <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 14,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  languageMenu: {
    backgroundColor: '#00A859',
    padding: 10,
    borderRadius: 10,
    elevation: 6,
    width: 56,
    alignItems: 'center'
  },
  flag: {
    width: 24,
    height: 24,
    marginVertical: 8
  }
});
