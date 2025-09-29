import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Login: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handleLogin = () => {
    if (email === 'admin@mottu.com' && password === '123456') {
      navigation.navigate('Home');
    } else {
      alert('Credenciais inválidas. \nEmail: admin@mottu.com\n Senha: 123456');
    }
  };

  const handleGoogle = () => {
    setModalVisible(true);
  };

  const handleMicrosoft = () => {
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Image
              source={require('../../assets/logo.png')}
              style={styles.modalLogo}
            />
            <Text style={styles.modalText}>Função ainda não implementada</Text>
          </View>
        </View>
      </Modal>

      <Animated.View
        style={[styles.logoContainer, { opacity: logoAnim }]}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[styles.formContainer, { opacity: formAnim }]}
      >
        <TextInput
          style={styles.input}
          placeholder="E-mail -> admin@mottu.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha -> 123456"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>— ou —</Text>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={handleGoogle}
        >
          <Image
            source={require('../../assets/google.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.microsoftButton]}
          onPress={handleMicrosoft}
        >
          <Image
            source={require('../../assets/microsoft.png')}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Entrar com Microsoft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
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
  logoContainer: {
    marginBottom: 40
  },
  logoImage: {
    width: 160,
    height: 60
  },
  formContainer: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#222',
    color: '#FFF',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    width: '60%'
  },
  button: {
    backgroundColor: '#00A859',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '60%'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  orText: {
    color: '#888',
    marginVertical: 12
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    width: '60%',
    marginBottom: 12,
    paddingHorizontal: 12
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12
  },
  googleButton: {
    backgroundColor: '#006400'
  },
  microsoftButton: {
    backgroundColor: '#2F2F2F'
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  registerButton: {
    marginTop: 16
  },
  registerText: {
    color: '#00A859',
    fontSize: 14,
    fontWeight: '600'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
 modalContent: {
  backgroundColor: '#000',
  padding: 30,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: 300,
  minHeight: 220 
},
modalLogo: {
  width: 100,
  height: 100,
  marginBottom: 20,
  resizeMode: 'contain'
},
modalText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center'
},
closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  padding: 10,
  zIndex: 10
},
closeButtonText: {
  color: '#FFF',
  fontSize: 22,
  fontWeight: 'bold'
}

});

export default Login;
