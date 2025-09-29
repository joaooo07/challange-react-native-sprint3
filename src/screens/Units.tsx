import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { getUnits, createUnit, deleteUnit, updateUnit } from "@/services/unitService";

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

  const loadUnits = async () => {
    try {
      const data = await getUnits();
      setUnits(data.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar as unidades.");
    }
  };

  const handleSave = async () => {
    if (!codigo || !nome) {
      Alert.alert("Erro", "Preencha código e nome!");
      return;
    }
    try {
      if (editingId) {
        await updateUnit(editingId, { codigo, nome, observacao, ativa });
        Alert.alert("Sucesso", "Unidade atualizada!");
      } else {
        await createUnit({ codigo, nome, observacao, ativa });
        Alert.alert("Sucesso", "Unidade criada!");
      }
      resetForm();
      loadUnits();
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar a unidade.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUnit(id);
      loadUnits();
    } catch (err) {
      Alert.alert("Erro", "Não foi possível deletar.");
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unidades</Text>

      <FlatList
        data={units}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.unitItem}>
            <Text style={styles.unitText}>
              {item.codigo} - {item.nome} ({item.ativa ? "Ativa" : "Inativa"})
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Código"
        placeholderTextColor="#888"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Observação"
        placeholderTextColor="#888"
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingId ? "Atualizar Unidade" : "Adicionar Unidade"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#FFF", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { backgroundColor: "#222", color: "#FFF", padding: 12, borderRadius: 6, marginBottom: 12 },
  button: { backgroundColor: "#00A859", padding: 14, borderRadius: 6, alignItems: "center" },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  unitItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, backgroundColor: "#111", padding: 12, borderRadius: 6 },
  unitText: { color: "#FFF" },
  editButton: { backgroundColor: "orange", padding: 8, borderRadius: 4 },
  editText: { color: "#FFF", fontWeight: "bold" },
  deleteButton: { backgroundColor: "red", padding: 8, borderRadius: 4 },
  deleteText: { color: "#FFF", fontWeight: "bold" }
});

export default Units;
