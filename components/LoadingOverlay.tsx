import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

export default function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#667EEA" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(60,60,60,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});