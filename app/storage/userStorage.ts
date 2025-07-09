import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserInfo = {
  id?: string;
  name?: string;
  native_language?: string;
  purpose_language?: string;
  reason?: string;
  time?: number;
  email?: string;
  teacher?: string;
  access_token?: string;
};

export type IsAllowNotificationAccess = {
  notification?: boolean;
}

const USER_INFO_KEY = 'userInfo';

export const saveUserInfo = async (info: Partial<UserInfo>) => {
  try {
    const existing = await AsyncStorage.getItem(USER_INFO_KEY);
    const userInfo: UserInfo = existing ? JSON.parse(existing) : {};
    const updated = { ...userInfo, ...info };
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    console.error('Failed to save user info:', e);
    return false;
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_INFO_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to get user info:', e);
    return null;
  }
};

export const clearUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(USER_INFO_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear user info:', e);
    return false;
  }
};