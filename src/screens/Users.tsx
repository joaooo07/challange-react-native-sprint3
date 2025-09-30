import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userService";
import { useAppTheme } from "@/navigation";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const { theme } = useAppTheme();

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar os usuários.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSave = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      if (editingUserId) {
        await updateUser(editingUserId, { nome, email, senha, ativo: true });
        Alert.alert("Sucesso", "Usuário atualizado!");
      } else {
        await createUser({ nome, email, senha, ativo: true });
        Alert.alert("Sucesso", "Usuário criado!");
      }
      setNome("");
      setEmail("");
      setSenha("");
      setEditingUserId(null);
      loadUsers();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar o usuário.");
    }
  };

  const handleEdit = (user: any) => {
    setNome(user.nome);
    setEmail(user.email);
    setSenha(user.senha);
    setEditingUserId(user.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      Alert.alert("Sucesso", "Usuário deletado!");
      loadUsers();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível deletar o usuário.");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Gerenciar Usuários
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSave}
      >
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {editingUserId ? "Atualizar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.userRow, { backgroundColor: theme.colors.card }]}
          >
            <Text style={[styles.userText, { color: theme.colors.text }]}>
              {item.nome} ({item.email})
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={[styles.edit, { color: "#FFD700" }]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.delete, { color: theme.colors.notification }]}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: { padding: 12, borderRadius: 6, marginBottom: 10 },
  button: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  userText: {},
  actions: { flexDirection: "row", gap: 12 },
  edit: { marginRight: 12 },
  delete: {},
});
