import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

import AnimatedRecordButton from '@/components/ui/AnimatedRecordButton';
import { LinearGradient } from 'expo-linear-gradient'; // Add this import

const CONVERSATION = [
  { speaker: 'Emma', text: "Hi! How's it going?", hasAudio: true },
  { speaker: 'Tom', text: '"Me too", I feel the same', hasAudio: true, isIncomplete: true },
  { speaker: 'Emma', text: "Same here. Work's been crazy lately.", hasAudio: true, hasUnderline: true, underline: 'Same here' },
  { speaker: 'Tom', text: "Tell me about it. Ready for the weekend?", hasAudio: true },
  { speaker: 'Emma', text: "Totally. Can't wait to sleep in!", hasAudio: true, hasUnderline: true, underline: 'sleep in' },
];

const COMPREHENSION_OPTIONS = [
  'Going to work',
  'The weekend',
  'A birthday party',
];

export default function SubScription() {
  const [showResultsPage, setShowResultsPage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [showFullVersion, setShowFullVersion] = useState(false);
  

  const router = useRouter();

  return (
    <LinearGradient
        colors={['#23244D', '#3A2966', '#7B3FA0', '#23244D']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.subGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowResultsPage(false)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
  
          <ScrollView contentContainerStyle={styles.subScrollContent}>
            {/* Title */}
            <Text style={styles.subTitle}>Select a plan and{'\n'}start your free trial</Text>
  
            {/* Plan Options */}
            <View style={styles.subPlansContainer}>
              {[
                { name: 'Standard', price: '$9.99', period: '/month', badge: 'Most flexible' },
                { name: 'Pro', price: '$19.99', period: '/month', badge: 'Save 50%' },
                { name: 'Yearly', price: '$199.99', period: '/month', badge: 'Best value' },
              ].map(plan => (
                <TouchableOpacity
                  key={plan.name}
                  style={[
                    styles.subPlanCard,
                    selectedPlan === plan.name && styles.subPlanCardSelected
                  ]}
                  onPress={() => setSelectedPlan(plan.name)}
                  activeOpacity={0.8}
                >
                  <View>
                    <Text style={styles.subPlanName}>{plan.name}</Text>
                    <Text style={styles.subPlanPrice}>
                      {plan.price}
                      <Text style={styles.subPlanPeriod}>{plan.period}</Text>
                    </Text>
                  </View>
                  <View style={styles.subPlanBadge}>
                    <Text style={styles.subPlanBadgeText}>{plan.badge}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
  
            {/* Trial Info */}
            <Text style={styles.subTrialInfo}>5 day free trial{'\n'}then 9.99/month</Text>
  
            {/* Start Trial Button */}
            <TouchableOpacity
              style={styles.subTrialButton}
              onPress={() => setShowFullVersion(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.subTrialButtonText}>START 5-DAY TRIAL</Text>
            </TouchableOpacity>
  
            {/* Cancel anytime */}
            <Text style={styles.subCancelAnytime}>Cancel anytime</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
    subGradient: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: 30,
      right: 24,
      zIndex: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.08)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: '300',
      lineHeight: 36,
    },
    subScrollContent: {
      paddingTop: 100,
      paddingBottom: 40,
      alignItems: 'center',
    },
    subTitle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 32,
      marginTop: 16,
    },
    subPlansContainer: {
      width: '92%',
      marginBottom: 32,
      marginTop: 40
    },
    subPlanCard: {
      backgroundColor: '#F4F6FB',
      borderRadius: 18,
      padding: 20,
      marginBottom: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: 'transparent',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    subPlanCardSelected: {
      borderColor: '#7B6EF6',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    subPlanName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222B45',
      marginBottom: 2,
    },
    subPlanPrice: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222B45',
    },
    subPlanPeriod: {
      fontSize: 15,
      color: '#888',
      fontWeight: '400',
    },
    subPlanBadge: {
      backgroundColor: '#fff',
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 6,
      marginLeft: 12,
      minWidth: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    subPlanBadgeText: {
      fontSize: 13,
      color: '#444',
      fontWeight: '600',
    },
    subTrialInfo: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 18,
      marginTop: 10,
      fontWeight: '400',
    },
    subTrialButton: {
      backgroundColor: '#3B4B7B',
      borderRadius: 24,
      paddingVertical: 16,
      paddingHorizontal: 40,
      alignItems: 'center',
      marginBottom: 12,
      width: '90%',
      alignSelf: 'center',
    },
    subTrialButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
      letterSpacing: 1,
    },
    subCancelAnytime: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.7,
      marginTop: 4,
    },
  });