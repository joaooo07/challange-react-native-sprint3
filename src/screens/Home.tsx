import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation';
import { useTranslation } from 'react-i18next'; 
import { useAppTheme } from '@/navigation'


type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();

  if (!i18n.isInitialized) {
    return <Text style={{ color: theme.colors.text }}>Carregando idioma...</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
        Idioma atual: {i18n.language}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('PatioList')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {t('patios')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('FormEntry', { slotId: "123", patioId: "p1" })}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {t('form_entry')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Users')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          Gerenciar Usuários
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("Units")}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          Gerenciar Patios
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Preferences')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {t('profile')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
