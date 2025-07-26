import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Calendar, Tag, CreditCard, FileText, X, Save } from 'lucide-react-native';
import { FormField } from './FormField';
import { DropdownSelector } from './DropdownSelector';
import { EditableGroupMemberSelector } from './EditableGroupMemberSelector';

interface GroupMember {
  id: string;
  name: string;
  amount: number;
  settled: boolean;
}

interface Group {
  id: string;
  totalAmount: string;
  myShare: string;
  description: string;
  date: string;
  members: GroupMember[];
  splitType: 'equal' | 'custom';
}

interface GroupEditFormProps {
  group: Group;
  onSave: (group: Group) => void;
  onCancel: () => void;
}

export function GroupEditForm({ group, onSave, onCancel }: GroupEditFormProps) {
  const [amount, setAmount] = useState(group.totalAmount.replace('₹', '').replace(',', ''));
  const [category, setCategory] = useState('Food'); // Default category
  const [paymentMode, setPaymentMode] = useState('UPI'); // Default payment mode
  const [date, setDate] = useState(group.date);
  const [description, setDescription] = useState(group.description);
  const [includeMe, setIncludeMe] = useState(true);
  const [splitType, setSplitType] = useState<'equal' | 'custom'>(group.splitType);
  const [members, setMembers] = useState<GroupMember[]>(group.members);

  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];
  const splitTypes = ['Equal Split', 'Custom Split'];

  const handleSave = () => {
    const totalAmount = parseFloat(amount) || 0;
    let updatedMembers = [...members];

    // Recalculate amounts based on split type
    if (splitType === 'equal') {
      const shareAmount = totalAmount / updatedMembers.length;
      updatedMembers = updatedMembers.map(member => ({
        ...member,
        amount: shareAmount
      }));
    }

    const updatedGroup: Group = {
      ...group,
      totalAmount: `₹${totalAmount.toLocaleString()}`,
      myShare: `₹${updatedMembers.find(m => m.name === 'Me')?.amount.toLocaleString() || '0'}`,
      description,
      date,
      members: updatedMembers,
      splitType
    };

    onSave(updatedGroup);
  };

  const handleMembersChange = (newMembers: GroupMember[]) => {
    setMembers(newMembers);
  };

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Edit Group Payment</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <X size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Save size={20} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <FormField
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter total amount"
          keyboardType="numeric"
          icon={<Tag size={20} color="#9CA3AF" />}
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

        <DropdownSelector
          label="Split Type"
          value={splitType === 'equal' ? 'Equal Split' : 'Custom Split'}
          onSelect={(value) => setSplitType(value === 'Equal Split' ? 'equal' : 'custom')}
          options={splitTypes}
          placeholder="Select split type"
          icon={<Tag size={20} color="#9CA3AF" />}
        />

        <EditableGroupMemberSelector
          members={members}
          onMembersChange={handleMembersChange}
          splitType={splitType}
          totalAmount={parseFloat(amount) || 0}
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
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    padding: 4,
  },
  saveButton: {
    padding: 4,
  },
  form: {
    gap: 16,
  },
});