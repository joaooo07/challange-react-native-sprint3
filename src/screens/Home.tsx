import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useTranslation } from 'react-i18next'; 

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { t, i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return <Text style={{ color: 'white' }}>Carregando idioma...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: '#888', marginBottom: 20 }}>
        Idioma atual: {i18n.language}
      </Text>
      ...


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PatiosList')}
      >
        <Text style={styles.buttonText}>{t('patios')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FormEntry')}
      >
        <Text style={styles.buttonText}>{t('form_entry')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Preferences')}
      >
        <Text style={styles.buttonText}>{t('profile')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: '#00A859'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Home;
