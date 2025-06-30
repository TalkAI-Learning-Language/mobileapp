import { Tabs } from 'expo-router';
import { Platform, View, Text, Image } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#667EEA',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 88 : 68,
        },
      }}>
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>
                <Image
                  source={require('@/assets/images/lessons/bottom_book.png')}
                  resizeMode="contain"
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#667EEA' : '#9CA3AF',
                  }}
                />                
              </Text>
            </View>
            ),
          }}
          />
          <Tabs.Screen
            name="practice"
            options={{
              title: 'Practice',
              tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={require('@/assets/images/lessons/bottom_practice.png')}
                  resizeMode="contain"
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#667EEA' : '#9CA3AF',
                  }}
                />
              </View>
              ),
            }}
          />
          <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>
                <Image
                  source={require('@/assets/images/lessons/bottom_profile.png')}
                  resizeMode="contain"
                  style={{
                    width: size,
                    height: size,
                    tintColor: focused ? '#667EEA' : '#9CA3AF',
                  }}
                />
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}