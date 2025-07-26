import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Plus } from 'lucide-react-native';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const [expenseListKey, setExpenseListKey] = useState(0);

  // Custom handler to force refresh ExpenseList after delete
  const handleExpenseDeleteRefresh = () => {
    setExpenseListKey(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Personal Expenses</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(!showForm)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {showForm && (
            <View style={styles.formContainer}>
              <ExpenseForm onClose={() => setShowForm(false)} />
            </View>
          )}
          {/* Pass a key and a callback to ExpenseList for delete refresh */}
          <ExpenseList key={expenseListKey} onDeleteRefresh={handleExpenseDeleteRefresh} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
});