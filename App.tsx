import './src/i18n/i18n';
import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import Navigation from './src/navigation';

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
        <Image source={getFlagSource(selectedLanguage)} style={{ width: 24, height: 24 }} />
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

  return <Navigation />;

}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 14,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  languageMenu: {
    backgroundColor: '#00A859',
    padding: 10,
    borderRadius: 10,
    elevation: 6,
    width: 56,
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 24,
    marginVertical: 8,
  },
});
