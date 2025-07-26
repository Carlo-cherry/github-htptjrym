import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { User, Check, X, CreditCard as Edit, Trash2, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { DropdownSelector } from './DropdownSelector';

interface FriendPayment {
  id: string;
  friend: string;
  amount: string;
  description: string;
  date: string;
  category: string;
  paymentMode?: string;
  settled: boolean;
}

interface FriendPaymentItemProps {
  payment: FriendPayment;
  type: 'my-payments' | 'other-payments';
  onEdit?: (payment: FriendPayment) => void;
  onDelete?: (paymentId: string) => void;
  onToggleSettle?: (paymentId: string) => void;
}

export function FriendPaymentItem({ payment, type, onEdit, onDelete, onToggleSettle }: FriendPaymentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    friend: payment.friend,
    amount: payment.amount.replace('₹', '').replace(',', ''),
    description: payment.description,
    date: payment.date,
    category: payment.category,
    paymentMode: payment.paymentMode || ''
  });

  // Get data from settings
  const friends = ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Wilson'];
  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const paymentModes = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];

  const isOwed = type === 'my-payments';

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      Alert.alert(
        'Delete Payment',
        'Are you sure you want to delete this payment?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDelete(payment.id) }
        ]
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!onEdit) return;
    
    const updatedPayment: FriendPayment = {
      ...payment,
      friend: editValues.friend,
      amount: `₹${parseFloat(editValues.amount || '0').toLocaleString()}`,
      description: editValues.description,
      date: editValues.date,
      category: editValues.category,
      paymentMode: editValues.paymentMode,
    };
    onEdit(updatedPayment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      friend: payment.friend,
      amount: payment.amount.replace('₹', '').replace(',', ''),
      description: payment.description,
      date: payment.date,
      category: payment.category,
      paymentMode: payment.paymentMode || ''
    });
    setIsEditing(false);
  };

  const handleToggleSettle = () => {
    onToggleSettle?.(payment.id);
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
          <View style={[styles.indicator, { backgroundColor: isOwed ? '#EF4444' : '#10B981' }]} />
          <View style={styles.iconContainer}>
            <User size={20} color="#9CA3AF" />
          </View>
          <View style={styles.details}>
            {isEditing ? (
              <View style={styles.editForm}>
                <DropdownSelector
                  label="Friend"
                  value={editValues.friend}
                  onSelect={(value) => updateEditValue('friend', value)}
                  options={friends}
                  placeholder="Select friend"
                />
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
                <DropdownSelector
                  label="Payment Mode"
                  value={editValues.paymentMode}
                  onSelect={(value) => updateEditValue('paymentMode', value)}
                  options={paymentModes}
                  placeholder="Select payment mode"
                />
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
                <Text style={styles.friend}>{payment.friend}</Text>
                <Text style={styles.description}>{payment.description}</Text>
                <Text style={styles.category}>{payment.category}</Text>
                {payment.paymentMode && (
                  <Text style={styles.paymentMode}>Payment: {payment.paymentMode}</Text>
                )}
              </>
            )}
          </View>
        </View>

        <View style={styles.right}>
          {!isEditing && (
            <>
              <Text style={[styles.amount, { color: isOwed ? '#EF4444' : '#10B981' }]}>
                {payment.amount}
              </Text>
              <Text style={styles.date}>{payment.date}</Text>
              <View style={styles.actions}>
                <TouchableOpacity 
                  onPress={handleToggleSettle} 
                  style={styles.settleButton}
                >
                  {payment.settled ? (
                    <CheckCircle size={20} color="#10B981" />
                  ) : (
                    <Circle size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
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
  indicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  friend: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#9CA3AF',
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
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settleButton: {
    padding: 4,
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