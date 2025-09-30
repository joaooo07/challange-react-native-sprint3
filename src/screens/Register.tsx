import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, useAppTheme } from "@/navigation";
import { register } from "@/services/authService";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useAppTheme();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      await register({
        nome: name,
        email,
        senha: password,
        ativo: true,
      });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar. Tente novamente.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Criar Conta
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleRegister}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.link, { color: theme.colors.primary }]}>
          Já tem uma conta? Faça login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { padding: 12, borderRadius: 6, marginBottom: 12 },
  button: { padding: 15, borderRadius: 6, alignItems: "center" },
  buttonText: { fontWeight: "bold", fontSize: 16 },
  link: { marginTop: 16, textAlign: "center" },
});
