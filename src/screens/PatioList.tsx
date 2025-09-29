import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'PatiosList'>;

const patios = [
  { id: 'p1', key: 'patio_name_1' },
  { id: 'p2', key: 'patio_name_2' },
  { id: 'p3', key: 'patio_name_3' }
];

const PatiosList: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FlatList
        data={patios}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PatioMap', { patioId: item.id })}
          >
            <Text style={styles.itemText}>{t(item.key)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16
  },
  listContent: {
    paddingBottom: 16
  },
  item: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 6,
    marginBottom: 12
  },
  itemText: {
    color: '#FFF',
    fontSize: 16
  }
});

export default PatiosList;
