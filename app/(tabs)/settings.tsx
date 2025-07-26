import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { SettingsSection } from '@/components/SettingsSection';
import { CategoryManager } from '@/components/CategoryManager';
import { FriendManager } from '@/components/FriendManager';
import { PaymentModeManager } from '@/components/PaymentModeManager';

type SettingsView = 'main' | 'categories' | 'friends' | 'payment-modes';

export default function Settings() {
  const [currentView, setCurrentView] = useState<SettingsView>('main');

  const renderContent = () => {
    switch (currentView) {
      case 'categories':
        return <CategoryManager />;
      case 'friends':
        return <FriendManager />;
      case 'payment-modes':
        return <PaymentModeManager />;
      default:
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Settings</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.sectionsContainer}>
                <SettingsSection
                  title="Categories"
                  description="Manage expense categories"
                  icon="Tag"
                  onPress={() => setCurrentView('categories')}
                />
                <SettingsSection
                  title="Friends"
                  description="Manage your friend list"
                  icon="Users"
                  onPress={() => setCurrentView('friends')}
                />
                <SettingsSection
                  title="Payment Modes"
                  description="Manage payment methods"
                  icon="CreditCard"
                  onPress={() => setCurrentView('payment-modes')}
                />
                <SettingsSection
                  title="Backup & Sync"
                  description="Data backup and synchronization"
                  icon="Cloud"
                />
                <SettingsSection
                  title="Notifications"
                  description="Manage app notifications"
                  icon="Bell"
                />
                <SettingsSection
                  title="Privacy"
                  description="Privacy and security settings"
                  icon="Shield"
                />
              </View>
            </ScrollView>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        {currentView !== 'main' && (
          <View style={styles.backButtonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setCurrentView('main')}
            >
              <ArrowLeft size={20} color="#FFFFFF" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
        {renderContent()}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  sectionsContainer: {
    gap: 16,
    paddingHorizontal: 20,
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});