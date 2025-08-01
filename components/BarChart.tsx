import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarChartData[];
  height?: number;
  showLegend?: boolean;
  xAxisLabel?: string;
}

export function BarChart({ data, height = 200, showLegend = false, xAxisLabel }: BarChartProps) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40; // Account for padding
  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = (chartWidth - 60) / data.length - 10; // Account for margins

  // Create y-axis labels
  const yAxisLabels = [];
  const step = Math.ceil(maxValue / 5);
  for (let i = 0; i <= maxValue + step; i += step) {
    yAxisLabels.push(i);
  }

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={[styles.container, { height: height + 100 }]}
    >
      {showLegend && (
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.chartArea}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {yAxisLabels.reverse().map((label, index) => (
            <Text key={index} style={styles.yAxisLabel}>₹{label}</Text>
          ))}
        </View>

        {/* Chart bars */}
        <View style={styles.barsContainer}>
          <View style={styles.gridLines}>
            {yAxisLabels.map((_, index) => (
              <View key={index} style={styles.gridLine} />
            ))}
          </View>
          
          <View style={styles.bars}>
            {data.map((item, index) => {
              const barHeight = (item.value / maxValue) * (height - 40);
              return (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        width: barWidth,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {xAxisLabel && (
        <View style={styles.xAxisContainer}>
          <Text style={styles.xAxisLabel}>{xAxisLabel}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  chartArea: {
    flexDirection: 'row',
    flex: 1,
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  barsContainer: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 4,
    minHeight: 2,
  },
  xAxisContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  xAxisLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});