import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { DashboardCard } from '@/components/DashboardCard';
import { RecentTransactions } from '@/components/RecentTransactions';
import { ExpenseSummary } from '@/components/ExpenseSummary';
// Insights import removed

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Track your expenses efficiently</Text>
          </View>

          <ExpenseSummary />

          <View style={styles.cardsContainer}>
            <DashboardCard
              title="Personal Expenses"
              amount="₹12,450"
              subtitle="This month"
              color="#3B82F6"
            />
            <DashboardCard
              title="Friend Payments"
              amount="₹2,840"
              subtitle="Pending"
              color="#EF4444"
            />
            <DashboardCard
              title="Group Expenses"
              amount="₹5,620"
              subtitle="This month"
              color="#10B981"
            />
            <DashboardCard
              title="Total Savings"
              amount="₹45,230"
              subtitle="Overall"
              color="#F59E0B"
            />
          </View>

          <RecentTransactions />
          {/* Insights tab removed */}
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
});