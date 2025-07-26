import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FriendPaymentList } from './FriendPaymentList';

export function FriendPaymentTabs() {
  const [activeTab, setActiveTab] = useState<'my-payments' | 'other-payments'>('my-payments');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my-payments' && styles.activeTab]}
          onPress={() => setActiveTab('my-payments')}
        >
          <Text style={[styles.tabText, activeTab === 'my-payments' && styles.activeTabText]}>
            My Payments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'other-payments' && styles.activeTab]}
          onPress={() => setActiveTab('other-payments')}
        >
          <Text style={[styles.tabText, activeTab === 'other-payments' && styles.activeTabText]}>
            Other Payments
          </Text>
        </TouchableOpacity>
      </View>

      <FriendPaymentList type={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    margin: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});