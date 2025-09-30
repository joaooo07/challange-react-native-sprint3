import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, useAppTheme } from '@/navigation';
import { getSlots, saveSlots, Slot as SlotType } from '../storage/storage';
import { useTranslation } from 'react-i18next';

const patios = [
  { id: 'p1', nameKey: 'patio_name_1' },
  { id: 'p2', nameKey: 'patio_name_2' },
  { id: 'p3', nameKey: 'patio_name_3' },
];

const patiosData: Record<string, SlotType[]> = {
  p1: [],
  p2: [],
  p3: [],
};

type Props = NativeStackScreenProps<RootStackParamList, 'FormEntry'>;

const FormEntry: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();

  const [selectedPatio, setSelectedPatio] = useState<string>(patios[0].id);
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<SlotType[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [form, setForm] = useState({ brand: '', plate: '', color: '', model: '' });

  useEffect(() => {
    async function load() {
      const stored = await getSlots(selectedPatio);
      const base = stored ?? patiosData[selectedPatio] ?? [];
      setSlots(base);
      setAvailableSlots(base.filter((s) => !s.occupied));
      setSelectedSlotId(null);
      setForm({ brand: '', plate: '', color: '', model: '' });
    }
    load();
  }, [selectedPatio]);

  const handleSave = async () => {
    if (!selectedSlotId) {
      Alert.alert(t('alert_select_spot'));
      return;
    }
    if (!form.brand || !form.plate || !form.color || !form.model) {
      Alert.alert(t('alert_fill_all_fields'));
      return;
    }
    const updated = slots.map((s) =>
      s.id === selectedSlotId ? { ...s, occupied: true, ...form } : s
    );
    setSlots(updated);
    await saveSlots(selectedPatio, updated);
    Alert.alert(t('alert_success_title'), t('alert_success_message'));
    setAvailableSlots(updated.filter((s) => !s.occupied));
    setSelectedSlotId(null);
    setForm({ brand: '', plate: '', color: '', model: '' });
    navigation.navigate('PatioMap', { patioId: selectedPatio });
  };

  const handleCancel = () => navigation.goBack();

  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.label, { color: theme.colors.text }]}>{t('select_patio')}</Text>
        <View style={styles.patioButtons}>
          {patios.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.patioButton,
                { backgroundColor: theme.colors.card },
                p.id === selectedPatio && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedPatio(p.id)}
            >
              <Text
                style={[
                  styles.patioButtonText,
                  { color: theme.colors.text },
                  p.id === selectedPatio && { fontWeight: '600' },
                ]}
              >
                {t(p.nameKey)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: theme.colors.text }]}>{t('available_spots')}</Text>
        <View style={styles.slotsContainer}>
          {availableSlots.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[
                styles.slotButton,
                { backgroundColor: theme.colors.card },
                s.id === selectedSlotId && { backgroundColor: '#FFD700' }, // pode criar uma cor highlight no theme
              ]}
              onPress={() => setSelectedSlotId((prev) => (prev === s.id ? null : s.id))}
            >
              <Text style={[styles.slotText, { color: theme.colors.text }]}>{s.id}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSlotId && (
          <>
            <Text style={[styles.label, { color: theme.colors.text }]}>{t('brand')}:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder={t('placeholder_brand')}
              placeholderTextColor="#888"
              value={form.brand}
              onChangeText={(text) => setForm({ ...form, brand: text })}
            />

            <Text style={[styles.label, { color: theme.colors.text }]}>{t('plate')}:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder={t('placeholder_plate')}
              placeholderTextColor="#888"
              value={form.plate}
              onChangeText={(text) => setForm({ ...form, plate: text })}
            />

            <Text style={[styles.label, { color: theme.colors.text }]}>{t('color')}:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder={t('placeholder_color')}
              placeholderTextColor="#888"
              value={form.color}
              onChangeText={(text) => setForm({ ...form, color: text })}
            />

            <Text style={[styles.label, { color: theme.colors.text }]}>{t('model')}:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
              placeholder={t('placeholder_model')}
              placeholderTextColor="#888"
              value={form.model}
              onChangeText={(text) => setForm({ ...form, model: text })}
            />

            <Pressable
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleSave}
            >
              <Text style={[styles.saveButtonText, { color: theme.colors.text }]}>
                {t('save')}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.cancelButton, { backgroundColor: theme.colors.border }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.colors.text }]}>
                {t('cancel')}
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16 },
  label: { fontSize: 16, marginVertical: 8 },
  patioButtons: { flexDirection: 'row', marginBottom: 16 },
  patioButton: { padding: 10, borderRadius: 6, marginRight: 8 },
  patioButtonActive: { fontWeight: '600' },
  patioButtonText: {},
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  slotButton: {
    width: 60,
    height: 60,
    margin: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotButtonActive: {},
  slotText: { fontWeight: 'bold' },
  input: { borderRadius: 6, padding: 8, marginTop: 4 },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: { fontSize: 16, fontWeight: 'bold' },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: { fontSize: 16 },
});

export default FormEntry;
