import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, X, Check, User } from 'lucide-react-native';

interface Friend {
  id: string;
  name: string;
}

export function FriendManager() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Emma Wilson' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [friendName, setFriendName] = useState('');

  const handleAdd = () => {
    if (friendName.trim()) {
      // Check for duplicates
      const exists = friends.some(friend => 
        friend.name.toLowerCase() === friendName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Friend', 'This friend already exists.');
        return;
      }
      
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: friendName.trim(),
      };
      setFriends([...friends, newFriend]);
      setFriendName('');
      setShowForm(false);
    }
  };

  const handleEdit = (friend: Friend) => {
    setEditingId(friend.id);
    setFriendName(friend.name);
  };

  const handleUpdate = () => {
    if (friendName.trim() && editingId) {
      // Check for duplicates (excluding current item)
      const exists = friends.some(friend => 
        friend.id !== editingId && 
        friend.name.toLowerCase() === friendName.trim().toLowerCase()
      );
      if (exists) {
        Alert.alert('Duplicate Friend', 'This friend already exists.');
        return;
      }
      
      setFriends(friends.map(friend => 
        friend.id === editingId 
          ? { ...friend, name: friendName.trim() }
          : friend
      ));
      setEditingId(null);
      setFriendName('');
    }
  };

  const handleDelete = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFriendName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Friends</Text>
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
            <Text style={styles.formTitle}>Add Friend</Text>
            <TouchableOpacity onPress={handleCancel}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={friendName}
            onChangeText={setFriendName}
            placeholder="Enter friend's name"
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
        {friends.map((friend) => (
          <LinearGradient
            key={friend.id}
            colors={['#1F2937', '#374151']}
            style={styles.item}
          >
            {editingId === friend.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={friendName}
                  onChangeText={setFriendName}
                  placeholder="Friend's name"
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
                <View style={styles.friendInfo}>
                  <View style={styles.avatar}>
                    <User size={20} color="#9CA3AF" />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.itemName}>{friend.name}</Text>
                  </View>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(friend)}
                    style={styles.actionButton}
                  >
                    <Edit size={18} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDelete(friend.id)}
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
    marginBottom: 12,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
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
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
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