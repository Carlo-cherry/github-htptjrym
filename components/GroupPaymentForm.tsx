import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Calendar, Tag, CreditCard, FileText, Users as Users2, X } from 'lucide-react-native';
import { FormField } from './FormField';
import { DropdownSelector } from './DropdownSelector';
import { GroupMemberSelector } from './GroupMemberSelector';

interface GroupPaymentFormProps {
  onClose: () => void;
}

export function GroupPaymentForm({ onClose }: GroupPaymentFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [includeMe, setIncludeMe] = useState(true);
  const [splitType, setSplitType] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Get data from settings - these would normally come from context or props
  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];
  const splitTypes = ['Equal Split', 'Custom Split'];

  const handleSubmit = () => {
    console.log({ 
      amount, 
      category, 
      paymentMode, 
      date, 
      description, 
      includeMe, 
      splitType, 
      selectedMembers 
    });
    onClose();
  };

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Add Group Payment</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <FormField
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter total amount (₹)"
          keyboardType="numeric"
          icon={<Text style={{ color: '#9CA3AF', fontSize: 16 }}>₹</Text>}
        />

        <DropdownSelector
          label="Split Type"
          value={splitType}
          onSelect={setSplitType}
          options={splitTypes}
          placeholder="Select split type"
          icon={<Users2 size={20} color="#9CA3AF" />}
        />

        <GroupMemberSelector
          selectedMembers={selectedMembers}
          onSelectionChange={setSelectedMembers}
          splitType={splitType}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Include me in this payment</Text>
          <Switch
            value={includeMe}
            onValueChange={setIncludeMe}
            trackColor={{ false: '#374151', true: '#3B82F6' }}
            thumbColor={includeMe ? '#FFFFFF' : '#9CA3AF'}
          />
        </View>

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
          <Text style={styles.submitText}>Add Group Expense</Text>
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 16,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
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