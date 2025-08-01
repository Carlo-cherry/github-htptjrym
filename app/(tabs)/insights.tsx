import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart } from '@/components/BarChart';
import { InsightCard } from '@/components/InsightCard';

export default function Insights() {
  // Sample data aggregated from expenses, friends, and groups
  const outflowByCategory = [
    { label: 'Food', value: 30, color: '#EF4444' },
    { label: 'Food', value: 22, color: '#3B82F6' },
    { label: 'Groceries', value: 10, color: '#10B981' },
    { label: 'Rent', value: 50, color: '#F59E0B' },
  ];

  const inflowByCategory = [
    { label: 'Food', value: 10, color: '#EF4444' },
    { label: 'Food', value: 15, color: '#3B82F6' },
    { label: 'Groceries', value: 20, color: '#10B981' },
    { label: 'Rent', value: 50, color: '#F59E0B' },
    { label: 'Transport', value: 43, color: '#8B5CF6' },
  ];

  const inflowByPaymentMode = [
    { label: 'Cash', value: 25, color: '#EF4444' },
    { label: 'Metro Card', value: 63, color: '#3B82F6' },
    { label: 'UPI', value: 50, color: '#10B981' },
  ];

  const settlementData = [
    { label: 'Paid Outflow', value: 55, color: '#10B981' },
    { label: 'Unpaid Outflow', value: 15, color: '#EF4444' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>Financial analytics and trends</Text>
          </View>

          {/* Summary Cards */}
          <View style={styles.cardsContainer}>
            <InsightCard
              title="Total Outflow"
              amount="₹20,910"
              subtitle="This month"
              color="#EF4444"
              trend="+12%"
            />
            <InsightCard
              title="Total Inflow"
              amount="₹15,640"
              subtitle="This month"
              color="#10B981"
              trend="+8%"
            />
            <InsightCard
              title="Net Balance"
              amount="₹-5,270"
              subtitle="This month"
              color="#F59E0B"
              trend="-4%"
            />
            <InsightCard
              title="Settlement Rate"
              amount="78%"
              subtitle="Paid vs Unpaid"
              color="#3B82F6"
              trend="+5%"
            />
          </View>

          {/* Outflow by Category Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Outflow by Month & Category</Text>
            <BarChart
              data={outflowByCategory}
              height={200}
              showLegend={true}
              xAxisLabel="Jun 2025"
            />
          </View>

          {/* Settlement Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Outflow Settlements: Paid vs. Unpaid</Text>
            <BarChart
              data={settlementData}
              height={200}
              showLegend={true}
              xAxisLabel=""
            />
          </View>

          {/* Inflow by Category Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Inflow by Month & Category</Text>
            <BarChart
              data={inflowByCategory}
              height={200}
              showLegend={true}
              xAxisLabel="Jun 2025"
            />
          </View>

          {/* Inflow by Payment Mode Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Inflow by Month & Payment Mode</Text>
            <BarChart
              data={inflowByPaymentMode}
              height={200}
              showLegend={true}
              xAxisLabel="Jun 2025"
            />
          </View>
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
    marginBottom: 32,
  },
  chartContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
});