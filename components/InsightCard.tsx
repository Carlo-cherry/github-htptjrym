import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface InsightCardProps {
  title: string;
  amount: string;
  subtitle: string;
  color: string;
  trend?: string;
}

export function InsightCard({ title, amount, subtitle, color, trend }: InsightCardProps) {
  const isPositiveTrend = trend?.startsWith('+');
  const isNegativeTrend = trend?.startsWith('-');

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
        <Text style={[styles.amount, { color }]}>{amount}</Text>
        <View style={styles.footer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {trend && (
            <View style={styles.trendContainer}>
              {isPositiveTrend && <TrendingUp size={14} color="#10B981" />}
              {isNegativeTrend && <TrendingDown size={14} color="#EF4444" />}
              <Text style={[
                styles.trend,
                { color: isPositiveTrend ? '#10B981' : isNegativeTrend ? '#EF4444' : '#9CA3AF' }
              ]}>
                {trend}
              </Text>
            </View>
          )}
        </View>
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trend: {
    fontSize: 12,
    fontWeight: '500',
  },
});