import AsyncStorage from '@react-native-async-storage/async-storage';

export type AllowNotificationAccess = {
  notification?: boolean;
}

const NOTIFICATION_ACCESS_KEY = 'notificationAccess';

export const saveNotificationAccess = async (info: Partial<AllowNotificationAccess>) => {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_ACCESS_KEY);
    const notificationAccess: AllowNotificationAccess = existing ? JSON.parse(existing) : {};
    const updated = { ...notificationAccess, ...info };
    await AsyncStorage.setItem(NOTIFICATION_ACCESS_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save user info:', e);
    return false;
  }
};

export const getNotificationAccess = async (): Promise<AllowNotificationAccess | null> => {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_ACCESS_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to get notification access:', e);
    return null;
  }
};

export const clearNotificationAccess = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_ACCESS_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear notification access:', e);
    return false;
  }
};