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
import { useTranslation } from "react-i18next";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      Alert.alert(t("error"), t("error_loading_users"));
    }
  };

  useEffect(() => {
    loadUsers();
  }, [t]);

  const handleSave = async () => {
    if (!nome || !email || !senha) {
      Alert.alert(t("error"), t("fill_all_fields"));
      return;
    }

    try {
      if (editingUserId) {
        await updateUser(editingUserId, { nome, email, senha, ativo: true });
        Alert.alert(t("success"), t("user_updated"));
      } else {
        await createUser({ nome, email, senha, ativo: true });
        Alert.alert(t("success"), t("user_created"));
      }
      setNome("");
      setEmail("");
      setSenha("");
      setEditingUserId(null);
      loadUsers();
    } catch (err) {
      console.error(err);
      Alert.alert(t("error"), t("error_saving_user"));
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
      Alert.alert(t("success"), t("user_deleted"));
      loadUsers();
    } catch (err) {
      console.error(err);
      Alert.alert(t("error"), t("error_deleting_user"));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t("manage_users")}
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder={t("name")}
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder={t("email")}
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder={t("password")}
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
          {editingUserId ? t("update") : t("register")}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.userRow, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.userText, { color: theme.colors.text }]}>
              {item.nome} ({item.email})
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={[styles.edit, { color: "#FFD700" }]}>{t("edit")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.delete, { color: theme.colors.notification }]}>
                  {t("delete")}
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
  button: { padding: 14, borderRadius: 6, alignItems: "center", marginBottom: 20 },
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
