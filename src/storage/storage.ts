import AsyncStorage from '@react-native-async-storage/async-storage';

export type Slot = {
  id: string;
  occupied: boolean;
  brand?: string;
  plate?: string;
  color?: string;
  model?: string;
};

const STORAGE_KEY_PREFIX = 'slots_';

/**
 * Retrieves the saved slots for a given patio from AsyncStorage.
 * @param patioId - Unique identifier of the patio
 * @returns Array of Slot objects or null if none found or on error
 */
export async function getSlots(patioId: string): Promise<Slot[] | null> {
  try {
    const raw = await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${patioId}`);
    if (raw) {
      return JSON.parse(raw) as Slot[];
    }
    return null;
  } catch (error) {
    console.error('Error loading slots from storage:', error);
    return null;
  }
}

/**
 * Persists the slots array for a given patio into AsyncStorage.
 * @param patioId - Unique identifier of the patio
 * @param slots 
 */
export async function saveSlots(patioId: string, slots: Slot[]): Promise<void> {
  try {
    const json = JSON.stringify(slots);
    await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${patioId}`, json);
  } catch (error) {
    console.error('Error saving slots to storage:', error);
  }
}
