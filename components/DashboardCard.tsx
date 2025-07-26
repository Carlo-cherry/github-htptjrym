import { View, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

interface DashboardCardProps {
  title: string;
  amount: string;
  subtitle: string;
  color: string;
}

export function DashboardCard({ title, amount, subtitle, color }: DashboardCardProps) {
  // Ensure rupee symbol is present
  const formattedAmount = amount.startsWith('₹') ? amount : `₹${amount}`;
  
  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.indicator, { backgroundColor: color }]} />
        </View>
        <Text style={styles.amount}>{formattedAmount}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});