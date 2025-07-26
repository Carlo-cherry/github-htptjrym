import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { CreditCard as Edit, Trash2, Check, X } from 'lucide-react-native';
import { DropdownSelector } from './DropdownSelector';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  category: string;
  date: string;
  type: 'expense' | 'friend' | 'group';
  friend?: string;
  paymentMode?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
  showActions?: boolean;
}

export function TransactionItem({ transaction, onEdit, onDelete, showActions = true }: TransactionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    description: transaction.description,
    amount: transaction.amount.replace('₹', '').replace(',', ''),
    category: transaction.category,
    date: transaction.date,
    friend: transaction.friend || '',
    paymentMode: transaction.paymentMode || ''
  });

  // Get data from settings
  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const friends = ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Wilson'];
  const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expense': return '#3B82F6';
      case 'friend': return '#EF4444';
      case 'group': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      Alert.alert(
        'Delete Transaction',
        'Are you sure you want to delete this transaction?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDelete(transaction.id) }
        ]
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!onEdit) return;
    
    const updatedTransaction: Transaction = {
      ...transaction,
      description: editValues.description,
      amount: `₹${parseFloat(editValues.amount || '0').toLocaleString()}`,
      category: editValues.category,
      date: editValues.date,
      friend: editValues.friend,
      paymentMode: editValues.paymentMode
    };
    onEdit(updatedTransaction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      description: transaction.description,
      amount: transaction.amount.replace('₹', '').replace(',', ''),
      category: transaction.category,
      date: transaction.date,
      friend: transaction.friend || '',
      paymentMode: transaction.paymentMode || ''
    });
    setIsEditing(false);
  };

  const updateEditValue = (field: string, value: string) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.item}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(transaction.type) }]} />
          <View style={styles.details}>
            {isEditing ? (
              <View style={styles.editForm}>
                <TextInput
                  style={styles.editInput}
                  value={editValues.description}
                  onChangeText={(text) => updateEditValue('description', text)}
                  placeholder="Description"
                  placeholderTextColor="#6B7280"
                />
                <DropdownSelector
                  label="Category"
                  value={editValues.category}
                  onSelect={(value) => updateEditValue('category', value)}
                  options={categories}
                  placeholder="Select category"
                />
                <TextInput
                  style={styles.editInput}
                  value={editValues.amount}
                  onChangeText={(text) => updateEditValue('amount', text)}
                  placeholder="Amount"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.editInput}
                  value={editValues.date}
                  onChangeText={(text) => updateEditValue('date', text)}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#6B7280"
                />
                {transaction.friend && (
                  <DropdownSelector
                    label="Friend"
                    value={editValues.friend}
                    onSelect={(value) => updateEditValue('friend', value)}
                    options={friends}
                    placeholder="Select friend"
                  />
                )}
                {transaction.paymentMode && (
                  <DropdownSelector
                    label="Payment Mode"
                    value={editValues.paymentMode}
                    onSelect={(value) => updateEditValue('paymentMode', value)}
                    options={paymentModes}
                    placeholder="Select payment mode"
                  />
                )}
                <View style={styles.editActions}>
                  <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Check size={16} color="#FFFFFF" />
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <X size={16} color="#FFFFFF" />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.description}>{transaction.description}</Text>
                <Text style={styles.category}>{transaction.category}</Text>
                {transaction.friend && (
                  <Text style={styles.friend}>Friend: {transaction.friend}</Text>
                )}
                {transaction.paymentMode && (
                  <Text style={styles.paymentMode}>Payment: {transaction.paymentMode}</Text>
                )}
              </>
            )}
          </View>
        </View>

        <View style={styles.right}>
          {!isEditing && (
            <>
              <Text style={styles.amount}>{transaction.amount}</Text>
              <Text style={styles.date}>{transaction.date}</Text>
              <View style={styles.actions}>
                <TouchableOpacity 
                  onPress={handleEdit} 
                  style={styles.actionButton}
                >
                  <Edit size={16} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleDelete} 
                  style={styles.actionButton}
                  disabled={typeof onDelete !== 'function'}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  typeIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  friend: {
    fontSize: 12,
    color: '#10B981',
    marginBottom: 2,
  },
  paymentMode: {
    fontSize: 12,
    color: '#F59E0B',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  editForm: {
    gap: 12,
    width: '100%',
  },
  editInput: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});