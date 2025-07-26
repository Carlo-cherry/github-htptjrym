import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function ExpenseSummary() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        style={styles.summaryCard}
      >
        <View style={styles.content}>
          <Text style={styles.label}>Monthly Spending</Text>
          <Text style={styles.amount}>₹20,910</Text>
          <View style={styles.changeContainer}>
            <Text style={styles.change}>+12% from last month</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 24,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#BFDBFE',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  changeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  change: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});