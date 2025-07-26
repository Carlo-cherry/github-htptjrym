import { View, Text, StyleSheet } from 'react-native';
import { TransactionItem } from './TransactionItem';

const recentTransactions = [
  {
    id: '1',
    description: 'Groceries',
    amount: '₹1,250',
    category: 'Food',
    date: '2025-01-01',
    type: 'expense',
  },
  {
    id: '2',
    description: 'Movie tickets',
    amount: '₹600',
    category: 'Entertainment',
    date: '2024-12-31',
    type: 'expense',
  },
  {
    id: '3',
    description: 'Friend payment',
    amount: '₹800',
    category: 'Friend',
    date: '2024-12-30',
    type: 'friend',
  },
  {
    id: '4',
    description: 'Dinner split',
    amount: '₹450',
    category: 'Group',
    date: '2024-12-29',
    type: 'group',
  },
];

export function RecentTransactions() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <View style={styles.transactionsList}>
        {recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            showActions={false}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
});
