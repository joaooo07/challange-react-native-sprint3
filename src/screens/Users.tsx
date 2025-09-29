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

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

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
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingUserId ? "Atualizar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userText}>
              {item.nome} ({item.email})
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    backgroundColor: "#222",
    color: "#FFF",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00A859",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 6,
  },
  userText: { color: "#FFF" },
  actions: { flexDirection: "row", gap: 12 },
  edit: { color: "#FFD700", marginRight: 12 },
  delete: { color: "#FF6347" },
});
