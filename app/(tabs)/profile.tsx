import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Switch,
  Image
} from 'react-native';

const SETTINGS_ITEMS = [
  {
    id: 'teacher',
    title: 'Change Teacher',
    value: 'Sarah Miller',
    icon: '👩‍🏫',
    hasArrow: true,
  },
  {
    id: 'language',
    title: 'App Language',
    value: 'English',
    icon: '🇺🇸',
    hasArrow: true,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Set App Reminders',
    hasSwitch: true,
    switchValue: true,
  },
  {
    id: 'membership',
    title: 'Manage Membership',
    value: 'Premium',
    hasArrow: true,
  },
  {
    id: 'minutes',
    title: 'Buy Extra Minutes',
    hasArrow: true,
  },
  {
    id: 'contact',
    title: 'Contact',
    hasArrow: true,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    hasArrow: true,
  },
  {
    id: 'terms',
    title: 'Terms of Use',
    hasArrow: true,
  },
  {
    id: 'logout',
    title: 'Log Out',
    icon: '🔄',
    isLogout: true,
  },
];

export default function ProfileTab() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>Emma Doe</Text>
          <Text style={styles.joinDate}>Joined May 5, 2025</Text>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {SETTINGS_ITEMS.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.settingItem,
                item.isLogout && styles.logoutItem
              ]}
            >
              <View style={styles.settingLeft}>
                {item.icon && (
                  <View style={styles.settingIconContainer}>
                    {item.id === 'teacher' ? (
                      <Image
                        source={{ uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=50' }}
                        style={styles.teacherImage}
                      />
                    ) : item.id === 'language' ? (
                      <Text style={styles.flagIcon}>🇺🇸</Text>
                    ) : (
                      <Text style={styles.settingIcon}>{item.icon}</Text>
                    )}
                  </View>
                )}
                
                <View style={styles.settingTextContainer}>
                  <Text style={[
                    styles.settingTitle,
                    item.isLogout && styles.logoutTitle
                  ]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>

              <View style={styles.settingRight}>
                {item.hasSwitch ? (
                  <Switch
                    value={item.switchValue}
                    onValueChange={() => {}}
                    trackColor={{ false: '#E5E7EB', true: '#667EEA' }}
                    thumbColor={item.switchValue ? '#FFFFFF' : '#FFFFFF'}
                  />
                ) : item.value ? (
                  <View style={styles.valueContainer}>
                    <Text style={styles.settingValue}>{item.value}</Text>
                    {item.hasArrow && (
                      <Text style={styles.arrow}>›</Text>
                    )}
                  </View>
                ) : item.hasArrow ? (
                  <Text style={styles.arrow}>›</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 32,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  settingsSection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutItem: {
    marginTop: 24,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teacherImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  settingIcon: {
    fontSize: 20,
  },
  flagIcon: {
    fontSize: 24,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  logoutTitle: {
    color: '#EF4444',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#D1D5DB',
    fontWeight: '300',
  },
});