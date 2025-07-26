import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, X, Check, CreditCard } from 'lucide-react-native';

interface PaymentMode {
  id: string;
  name: string;
}

export function PaymentModeManager() {
  const [paymentModes, setPaymentModes] = useState<PaymentMode[]>([
    { id: '1', name: 'Cash' },
    { id: '2', name: 'Credit Card' },
    { id: '3', name: 'Debit Card' },
    { id: '4', name: 'UPI' },
    { id: '5', name: 'Net Banking' },
    { id: '6', name: 'Wallet' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modeName, setModeName] = useState('');

  const handleAdd = () => {
    if (modeName.trim()) {
      // Check for duplicates
      const exists = paymentModes.some(mode => 
        mode.name.toLowerCase() === modeName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Payment Mode', 'This payment mode already exists.');
        return;
      }
      
      const newPaymentMode: PaymentMode = {
        id: Date.now().toString(),
        name: modeName.trim(),
      };
      setPaymentModes([...paymentModes, newPaymentMode]);
      setModeName('');
      setShowForm(false);
    }
  };

  const handleEdit = (paymentMode: PaymentMode) => {
    setEditingId(paymentMode.id);
    setModeName(paymentMode.name);
  };

  const handleUpdate = () => {
    if (modeName.trim() && editingId) {
      // Check for duplicates (excluding current item)
      const exists = paymentModes.some(mode => 
        mode.id !== editingId && 
        mode.name.toLowerCase() === modeName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Payment Mode', 'This payment mode already exists.');
        return;
      }
      
      setPaymentModes(paymentModes.map(mode => 
        mode.id === editingId 
          ? { ...mode, name: modeName.trim() }
          : mode
      ));
      setEditingId(null);
      setModeName('');
    }
  };

  const handleDelete = (id: string) => {
    setPaymentModes(paymentModes.filter(mode => mode.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setModeName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Payment Modes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showForm && (
        <LinearGradient
          colors={['#1F2937', '#374151']}
          style={styles.form}
        >
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add Payment Mode</Text>
            <TouchableOpacity onPress={handleCancel}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={modeName}
            onChangeText={setModeName}
            placeholder="Enter payment mode name"
            placeholderTextColor="#6B7280"
            autoFocus
          />
          <View style={styles.formActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
              <Text style={styles.submitText}>Add</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {paymentModes.map((paymentMode) => (
          <LinearGradient
            key={paymentMode.id}
            colors={['#1F2937', '#374151']}
            style={styles.item}
          >
            {editingId === paymentMode.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={modeName}
                  onChangeText={setModeName}
                  placeholder="Payment mode name"
                  placeholderTextColor="#6B7280"
                  autoFocus
                />
                <View style={styles.editActions}>
                  <TouchableOpacity onPress={handleCancel} style={styles.actionButton}>
                    <X size={18} color="#EF4444" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleUpdate} style={styles.actionButton}>
                    <Check size={18} color="#10B981" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.itemContent}>
                <View style={styles.modeInfo}>
                  <View style={styles.typeIndicator}>
                    <CreditCard size={16} color="#FFFFFF" />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.itemName}>{paymentMode.name}</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(paymentMode)}
                    style={styles.actionButton}
                  >
                    <Edit size={18} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDelete(paymentMode.id)}
                    style={styles.actionButton}
                  >
                    <Trash2 size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 16,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  item: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editInput: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#374151',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
});