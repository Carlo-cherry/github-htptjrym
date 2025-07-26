import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Calendar, Tag, CreditCard, FileText, X } from 'lucide-react-native';
import { FormField } from './FormField';
import { DropdownSelector } from './DropdownSelector';

interface ExpenseFormProps {
  onClose: () => void;
}

export function ExpenseForm({ onClose }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Get data from settings - these would normally come from context or props
  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];

  const handleSubmit = () => {
    // Handle form submission
    console.log({ amount, category, paymentMode, date, description });
    onClose();
  };

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Add Expense</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <FormField
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount (₹)"
          keyboardType="numeric"
          icon={<Text style={{ color: '#9CA3AF', fontSize: 16 }}>₹</Text>}
        />

        <DropdownSelector
          label="Category"
          value={category}
          onSelect={setCategory}
          options={categories}
          placeholder="Select category"
          icon={<Tag size={20} color="#9CA3AF" />}
        />

        <DropdownSelector
          label="Payment Mode"
          value={paymentMode}
          onSelect={setPaymentMode}
          options={paymentModes}
          placeholder="Select payment mode"
          icon={<CreditCard size={20} color="#9CA3AF" />}
        />

        <FormField
          label="Date"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          icon={<Calendar size={20} color="#9CA3AF" />}
        />

        <FormField
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={3}
          icon={<FileText size={20} color="#9CA3AF" />}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    gap: 16,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});