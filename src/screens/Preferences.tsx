import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, useAppTheme } from '@/navigation';
import { useTranslation } from 'react-i18next';

const USER_NAME_KEY = 'prefs_user_name';
const USER_ID_KEY = 'prefs_user_id';
const USER_EMAIL_KEY = 'prefs_user_email';
const USER_ROLE_KEY = 'prefs_user_role';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

const Preferences: React.FC<Props> = ({ navigation }) => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('Admin');

  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem(USER_NAME_KEY);
      const id = await AsyncStorage.getItem(USER_ID_KEY);
      const mail = await AsyncStorage.getItem(USER_EMAIL_KEY);
      const rl = await AsyncStorage.getItem(USER_ROLE_KEY);
      if (name) setUserName(name);
      if (id) setUserId(id);
      if (mail) setEmail(mail);
      if (rl) setRole(rl);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        USER_NAME_KEY,
        USER_ID_KEY,
        USER_EMAIL_KEY,
        USER_ROLE_KEY,
      ]);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível realizar o logout.');
    }
  };

  if (!i18n.isInitialized) {
    return <Text style={{ color: theme.colors.text }}>Carregando idioma...</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.header, { color: theme.colors.text }]}>{t('user_profile')}</Text>

      <View style={[styles.profileContainer, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.profileLabel, { color: theme.colors.border }]}>{t('name')}:</Text>
        <Text style={[styles.profileValue, { color: theme.colors.text }]}>{userName}</Text>

        <Text style={[styles.profileLabel, { color: theme.colors.border }]}>{t('id')}:</Text>
        <Text style={[styles.profileValue, { color: theme.colors.text }]}>{userId}</Text>

        <Text style={[styles.profileLabel, { color: theme.colors.border }]}>E-mail:</Text>
        <Text style={[styles.profileValue, { color: theme.colors.text }]}>{email}</Text>

        <Text style={[styles.profileLabel, { color: theme.colors.border }]}>{t('role')}:</Text>
        <Text style={[styles.profileValue, { color: theme.colors.text }]}>{role}</Text>
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backButtonText, { color: theme.colors.text }]}>{t('back')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.colors.notification, marginTop: 16 }]}
        onPress={handleLogout}
      >
        <Text style={[styles.backButtonText, { color: theme.colors.text }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  profileLabel: {
    fontSize: 14,
    marginTop: 12,
  },
  profileValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 'auto',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Preferences;
