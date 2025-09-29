import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getSlots, saveSlots, Slot as SlotType } from '../storage/storage';
import { useTranslation } from 'react-i18next'; // i18n importado

const patiosData: Record<string, SlotType[]> = {
  p1: [
    { id: 'A1', occupied: true, brand: 'Honda', plate: 'ABC-1234', color: 'Vermelho', model: 'CG 160' },
    { id: 'A2', occupied: false },
    { id: 'B1', occupied: true, brand: 'Yamaha', plate: 'XYZ-5678', color: 'Preto', model: 'YZF R3' },
    { id: 'B2', occupied: false },
    { id: 'C1', occupied: true, brand: 'Suzuki', plate: 'JKL-9012', color: 'Azul', model: 'GSX-S750' },
    { id: 'C2', occupied: false }
  ],
  p2: [
    { id: 'D1', occupied: true, brand: 'Ducati', plate: 'DUC-2025', color: 'Branco', model: 'Panigale V4' },
    { id: 'D2', occupied: true, brand: 'Kawasaki', plate: 'KAW-4455', color: 'Verde', model: 'Ninja ZX-10R' },
    { id: 'E1', occupied: false },
    { id: 'E2', occupied: false },
    { id: 'F1', occupied: true, brand: 'BMW', plate: 'BMW-7890', color: 'Preto', model: 'S1000RR' },
    { id: 'F2', occupied: false }
  ],
  p3: [
    { id: 'G1', occupied: false },
    { id: 'G2', occupied: false },
    { id: 'H1', occupied: true, brand: 'Triumph', plate: 'TRI-3333', color: 'Azul', model: 'Street Triple' },
    { id: 'H2', occupied: true, brand: 'Harley', plate: 'HAR-6666', color: 'Preto', model: 'Iron 883' },
    { id: 'I1', occupied: false },
    { id: 'I2', occupied: true, brand: 'KTM', plate: 'KTM-1111', color: 'Laranja', model: 'Duke 390' }
  ]
};

type Props = NativeStackScreenProps<RootStackParamList, 'PatioMap'>;

const PatioMap: React.FC<Props> = ({ route }) => {
  const { patioId } = route.params;
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ brand: '', plate: '', color: '', model: '' });
  const { t } = useTranslation();

  const selectedSlot = slots.find(slot => slot.id === selectedId);
  const isOccupied = selectedSlot?.occupied;

  useEffect(() => {
    async function loadSlots() {
      const stored = await getSlots(patioId);
      setSlots(stored ?? patiosData[patioId] ?? []);
    }
    loadSlots();
  }, [patioId]);

  const handleSave = async () => {
    if (!selectedSlot) return;
    const updated = slots.map(s =>
      s.id === selectedSlot.id ? { ...s, occupied: true, ...form } : s
    );
    setSlots(updated);
    await saveSlots(patioId, updated);
    setSelectedId(null);
    setForm({ brand: '', plate: '', color: '', model: '' });
  };

  const handleVacate = async () => {
    if (!selectedSlot) return;
    const cleared = slots.map(s =>
      s.id === selectedSlot.id ? { id: s.id, occupied: false } : s
    );
    setSlots(cleared);
    await saveSlots(patioId, cleared);
    setSelectedId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.legendContainer}>
        <View style={[styles.legendItem, { backgroundColor: '#00A859' }]} />
        <Text style={styles.legendText}>{t('occupied')}</Text>
        <View style={[styles.legendItem, { backgroundColor: '#444' }]} />
        <Text style={styles.legendText}>{t('free')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator>
        {slots.map(slot => {
          const isSelected = selectedId === slot.id;
          const bgColor = isSelected ? '#FF4D4D' : slot.occupied ? '#00A859' : '#444';
          return (
            <TouchableOpacity
              key={slot.id}
              style={[styles.slot, { backgroundColor: bgColor }]} 
              onPress={() => setSelectedId(slot.id)}
            >
              <Text style={styles.slotText}>{slot.id}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedSlot && (
        <Modal visible transparent animationType="fade" onRequestClose={() => setSelectedId(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>{t('spot')} {selectedSlot.id}</Text>
                {isOccupied ? (
                  <>
                    <Text style={styles.modalLabel}>
                      {t('brand')}: <Text style={styles.modalValue}>{selectedSlot.brand}</Text>
                    </Text>
                    <Text style={styles.modalLabel}>
                      {t('plate')}: <Text style={styles.modalValue}>{selectedSlot.plate}</Text>
                    </Text>
                    <Text style={styles.modalLabel}>
                      {t('color')}: <Text style={styles.modalValue}>{selectedSlot.color}</Text>
                    </Text>
                    <Text style={styles.modalLabel}>
                      {t('model')}: <Text style={styles.modalValue}>{selectedSlot.model}</Text>
                    </Text>
                    <Pressable style={styles.vacateButton} onPress={handleVacate}>
                      <Text style={styles.vacateButtonText}>{t('vacate_spot')}</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Text style={styles.formLabel}>{t('brand')}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Honda"
                      value={form.brand}
                      onChangeText={text => setForm({ ...form, brand: text })}
                    />
                    <Text style={styles.formLabel}>{t('plate')}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="ABC-1234"
                      value={form.plate}
                      onChangeText={text => setForm({ ...form, plate: text })}
                    />
                    <Text style={styles.formLabel}>{t('color')}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Vermelho"
                      value={form.color}
                      onChangeText={text => setForm({ ...form, color: text })}
                    />
                    <Text style={styles.formLabel}>{t('model')}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. CG 160"
                      value={form.model}
                      onChangeText={text => setForm({ ...form, model: text })}
                    />
                    <Pressable style={styles.saveButton} onPress={handleSave}>
                      <Text style={styles.saveButtonText}>{t('save')}</Text>
                    </Pressable>
                  </>
                )}
                <Pressable style={styles.closeButton} onPress={() => setSelectedId(null)}>
                  <Text style={styles.closeButtonText}>{t('close')}</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  legendContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  legendItem: { width: 16, height: 16, borderRadius: 4, marginHorizontal: 4 },
  legendText: { color: '#FFF', fontSize: 14, marginHorizontal: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  slot: { width: '30%', aspectRatio: 1, margin: '1.66%', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  slotText: { color: '#FFF', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#FFF', borderRadius: 8, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalLabel: { fontSize: 14, marginVertical: 4 },
  modalValue: { fontWeight: '600' },
  formLabel: { fontSize: 14, marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 6, padding: 8, marginTop: 4 },
  saveButton: { marginTop: 16, backgroundColor: '#00A859', paddingVertical: 12, borderRadius: 6, alignItems: 'center' },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  vacateButton: { marginTop: 12, backgroundColor: '#FF4D4D', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  vacateButtonText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  closeButton: { marginTop: 8, backgroundColor: '#666', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  closeButtonText: { color: '#FFF', fontSize: 14, fontWeight: '600' }
});

export default PatioMap;
