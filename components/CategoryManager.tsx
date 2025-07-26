import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, X, Check } from 'lucide-react-native';

interface Category {
  id: string;
  name: string;
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Food' },
    { id: '2', name: 'Transportation' },
    { id: '3', name: 'Entertainment' },
    { id: '4', name: 'Shopping' },
    { id: '5', name: 'Bills' },
    { id: '6', name: 'Health' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState('');

  const handleAdd = () => {
    if (categoryName.trim()) {
      // Check for duplicates
      const exists = categories.some(cat => 
        cat.name.toLowerCase() === categoryName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Category', 'This category already exists.');
        return;
      }
      
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryName.trim(),
      };
      setCategories([...categories, newCategory]);
      setCategoryName('');
      setShowForm(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
  };

  const handleUpdate = () => {
    if (categoryName.trim() && editingId) {
      // Check for duplicates (excluding current item)
      const exists = categories.some(cat => 
        cat.id !== editingId && 
        cat.name.toLowerCase() === categoryName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Category', 'This category already exists.');
        return;
      }
      
      setCategories(categories.map(cat => 
        cat.id === editingId 
          ? { ...cat, name: categoryName.trim() }
          : cat
      ));
      setEditingId(null);
      setCategoryName('');
    }
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setCategoryName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Categories</Text>
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
            <Text style={styles.formTitle}>Add Category</Text>
            <TouchableOpacity onPress={handleCancel}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Enter category name"
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
        {categories.map((category) => (
          <LinearGradient
            key={category.id}
            colors={['#1F2937', '#374151']}
            style={styles.item}
          >
            {editingId === category.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={categoryName}
                  onChangeText={setCategoryName}
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
                <Text style={styles.itemName}>{category.name}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(category)}
                    style={styles.actionButton}
                  >
                    <Edit size={18} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDelete(category.id)}
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
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
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