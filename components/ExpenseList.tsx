import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { TransactionItem } from './TransactionItem';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  type: 'expense' | 'friend' | 'group';
  paymentMode?: string;
}

const initialExpenses: Transaction[] = [
  { id: '1', description: 'Grocery Shopping', amount: '₹1,250', category: 'Food', date: '2025-01-01', type: 'expense' as const, paymentMode: 'Credit Card' },
  { id: '2', description: 'Fuel', amount: '₹800', category: 'Transportation', date: '2024-12-31', type: 'expense' as const, paymentMode: 'UPI' },
  { id: '3', description: 'Movie Tickets', amount: '₹600', category: 'Entertainment', date: '2024-12-30', type: 'expense' as const, paymentMode: 'Debit Card' },
  { id: '4', description: 'Electricity Bill', amount: '₹2,400', category: 'Bills', date: '2024-12-29', type: 'expense' as const, paymentMode: 'Net Banking' },
  { id: '5', description: 'Coffee', amount: '₹120', category: 'Food', date: '2024-12-28', type: 'expense' as const, paymentMode: 'Cash' },
];

export function ExpenseList() {
  const [expenses, setExpenses] = useState<Transaction[]>(initialExpenses);

  const handleEditExpense = (updatedTransaction: Transaction) => {
    setExpenses(expenses.map(expense => 
      expense.id === updatedTransaction.id ? updatedTransaction : expense
    ));
  };

  const handleDeleteExpense = (transactionId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== transactionId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Expenses</Text>
      <View style={styles.expensesList}>
        {expenses.map((expense) => (
          <TransactionItem 
            key={expense.id} 
            transaction={expense}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
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
  expensesList: {
    gap: 12,
  },
});