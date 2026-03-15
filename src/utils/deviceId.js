import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const STORAGE_KEY = '@PhoneID';

export async function getOrCreateUUID() {
  try {
    const current = await AsyncStorage.getItem(STORAGE_KEY);
    if (current) {
      return current;
    }

    const generated = Crypto.randomUUID();
    await AsyncStorage.setItem(STORAGE_KEY, generated);
    return generated;
  } catch (error) {
    console.error('Failed to get or create UUID', error);
    return null;
  }
}
