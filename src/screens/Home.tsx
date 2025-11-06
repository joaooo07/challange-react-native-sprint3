import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, useAppTheme } from '@/navigation';
import { useTranslation } from 'react-i18next';
import { sendLocalNotification } from '@/hooks/usePushNotifications';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();

  if (!i18n.isInitialized) {
    return <Text style={{ color: theme.colors.text }}>Carregando idioma...</Text>;
  }

  const handleNotificationTest = async () => {
    const title = "Mottu Informa";
    const body = "Pátio de BMW na Unidade 1 está lotado";

    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${body}`); // ✅ funciona na web
    } else {
      await sendLocalNotification(title, body); // ✅ nativo (Android/iOS)
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
        {t('current_language')}: {i18n.language}
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
        onPress={() => navigation.navigate('FormEntry', { slotId: '123', patioId: 'p1' })}
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
          {t('manage_users')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Units')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {t('manage_yards')}
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

      {/* Botão de teste de notificação */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00A859' }]}
        onPress={handleNotificationTest}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>
          Últimas Notícias
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
