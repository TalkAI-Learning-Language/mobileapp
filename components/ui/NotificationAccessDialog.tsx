import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or use your preferred icon set

type NotificationAccessDialogProps = {
    visible: boolean;
    onAllow: () => void;
    onLater: () => void;
};

export default function NotificationAccessDialog({ visible, onAllow, onLater } : NotificationAccessDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onLater}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={40} color="#B39DFF" />
          </View>
          <Text style={styles.title}>Notification Access</Text>
          <Text style={styles.subtitle}>
            We'd like to send you notifications to keep you informed about important updates
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onLater}>
              <Text style={styles.laterText}>Later</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.button} onPress={onAllow}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 28, 47, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#23244D',
    borderRadius: 16,
    padding: 24,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    backgroundColor: '#2D2E5E',
    borderRadius: 32,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#C7C7D9',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#393A6B',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  laterText: {
    color: '#C7C7D9',
    fontSize: 16,
    fontWeight: '500',
  },
  allowText: {
    color: '#B39DFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    backgroundColor: '#393A6B',
  },
});