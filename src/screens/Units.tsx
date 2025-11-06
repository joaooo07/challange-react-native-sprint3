import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getUnits, createUnit, deleteUnit, updateUnit } from "@/services/unitService";
import { useAppTheme } from "@/navigation";
import { useTranslation } from "react-i18next";

type Unit = {
  id: number;
  codigo: string;
  nome: string;
  observacao: string;
  ativa: boolean;
};

const Units: React.FC = () => {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [ativa, setAtiva] = useState(true);
  const [units, setUnits] = useState<Unit[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const loadUnits = async () => {
    try {
      const data = await getUnits();
      setUnits(data.data);
    } catch (err) {
      console.error(err);
      Alert.alert(t("error"), t("error_loading_units"));
    }
  };

  const handleSave = async () => {
    if (!codigo || !nome) {
      Alert.alert(t("error"), t("fill_code_name"));
      return;
    }
    try {
      if (editingId) {
        await updateUnit(editingId, { codigo, nome, observacao, ativa });
        Alert.alert(t("success"), t("unit_updated"));
      } else {
        await createUnit({ codigo, nome, observacao, ativa });
        Alert.alert(t("success"), t("unit_created"));
      }
      resetForm();
      loadUnits();
    } catch (err) {
      Alert.alert(t("error"), t("error_saving_unit"));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUnit(id);
      loadUnits();
    } catch (err) {
      Alert.alert(t("error"), t("error_deleting_unit"));
    }
  };

  const handleEdit = (unit: Unit) => {
    setEditingId(unit.id);
    setCodigo(unit.codigo);
    setNome(unit.nome);
    setObservacao(unit.observacao);
    setAtiva(unit.ativa);
  };

  const resetForm = () => {
    setEditingId(null);
    setCodigo("");
    setNome("");
    setObservacao("");
    setAtiva(true);
  };

  useEffect(() => {
    loadUnits();
  }, [t]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t("units")}</Text>

      <FlatList
        data={units}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.unitItem, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.unitText, { color: theme.colors.text }]}>
              {item.codigo} - {item.nome} ({item.ativa ? t("active") : t("inactive")})
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={[styles.editButton, { backgroundColor: "orange" }]}
              >
                <Text style={styles.editText}>{t("edit")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={[styles.deleteButton, { backgroundColor: theme.colors.notification }]}
              >
                <Text style={styles.deleteText}>{t("delete")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder={t("code")}
        placeholderTextColor="#888"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder={t("name")}
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder={t("note")}
        placeholderTextColor="#888"
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleSave}>
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {editingId ? t("update_unit") : t("add_unit")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { padding: 12, borderRadius: 6, marginBottom: 12, borderWidth: 1 },
  button: { padding: 14, borderRadius: 6, alignItems: "center" },
  buttonText: { fontWeight: "bold" },
  unitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  unitText: { fontSize: 16 },
  editButton: { padding: 8, borderRadius: 4 },
  editText: { color: "#FFF", fontWeight: "bold" },
  deleteButton: { padding: 8, borderRadius: 4 },
  deleteText: { color: "#FFF", fontWeight: "bold" },
});

export default Units;
