import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, useAppTheme } from '@/navigation';
import { getUnits } from '@/services/unitService';

type Unit = {
  id: number;
  codigo: string;
  nome: string;
  observacao: string;
  ativa: boolean;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PatioList'>;

const PatiosList: React.FC<Props> = ({ navigation }) => {
  const [patios, setPatios] = useState<Unit[]>([]);
  const { theme } = useAppTheme();

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const data = await getUnits();
        setPatios(data.data ?? data);
      } catch (err) {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar os pátios (unidades).");
      }
    };

    loadUnits();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={patios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('PatioMap', { patioId: item.id.toString() })}
          >
            <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

export default PatiosList;
