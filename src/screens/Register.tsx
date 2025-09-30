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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { theme } = useAppTheme();

  const validateFields = () => {
    let newErrors: { [key: string]: string } = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    else if (name.trim().length < 3)
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";

    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!emailRegex.test(email)) newErrors.email = "Digite um email válido";

    if (password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "As senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      await register({
        nome: name,
        email: email.toLowerCase(),
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

      {/* Nome */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: errors.name ? "red" : "#ccc",
          },
        ]}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Email */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: errors.email ? "red" : "#ccc",
          },
        ]}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Senha */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: errors.password ? "red" : "#ccc",
          },
        ]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Confirmar Senha */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: errors.confirmPassword ? "red" : "#ccc",
          },
        ]}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 4,
    borderWidth: 1,
  },
  button: { padding: 15, borderRadius: 6, alignItems: "center", marginTop: 16 },
  buttonText: { fontWeight: "bold", fontSize: 16 },
  link: { marginTop: 16, textAlign: "center" },
  error: { color: "red", fontSize: 12, marginBottom: 8 },
});
