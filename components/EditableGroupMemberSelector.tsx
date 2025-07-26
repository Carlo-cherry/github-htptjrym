import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { User, Check, X, Plus, Trash2 } from 'lucide-react-native';

interface GroupMember {
  id: string;
  name: string;
  amount: number;
  settled: boolean;
}

interface EditableGroupMemberSelectorProps {
  members: GroupMember[];
  onMembersChange: (members: GroupMember[]) => void;
  splitType: 'equal' | 'custom';
  totalAmount: number;
}

export function EditableGroupMemberSelector({ 
  members, 
  onMembersChange, 
  splitType, 
  totalAmount 
}: EditableGroupMemberSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const availableMembers = [
    'John Doe', 'Sarah Smith', 'Mike Johnson', 'Emma Wilson', 
    'Alex Brown', 'Lisa Davis', 'Tom Wilson', 'Sophie Chen'
  ];

  const addMember = (memberName: string) => {
    if (members.some(m => m.name === memberName)) {
      Alert.alert('Duplicate Member', 'This member is already in the group.');
      return;
    }

    const shareAmount = splitType === 'equal' ? totalAmount / (members.length + 1) : 0;
    const newMember: GroupMember = {
      id: Date.now().toString(),
      name: memberName,
      amount: shareAmount,
      settled: false
    };

    let updatedMembers = [...members, newMember];
    
    if (splitType === 'equal') {
      // Recalculate all amounts for equal split
      const equalShare = totalAmount / updatedMembers.length;
      updatedMembers = updatedMembers.map(member => ({
        ...member,
        amount: equalShare
      }));
    }

    onMembersChange(updatedMembers);
    setShowAddForm(false);
    setNewMemberName('');
  };

  const removeMember = (memberId: string) => {
    const updatedMembers = members.filter(m => m.id !== memberId);
    
    if (splitType === 'equal' && updatedMembers.length > 0) {
      // Recalculate amounts for remaining members
      const equalShare = totalAmount / updatedMembers.length;
      const recalculatedMembers = updatedMembers.map(member => ({
        ...member,
        amount: equalShare
      }));
      onMembersChange(recalculatedMembers);
    } else {
      onMembersChange(updatedMembers);
    }
  };

  const updateMemberAmount = (memberId: string, newAmount: number) => {
    const updatedMembers = members.map(member =>
      member.id === memberId ? { ...member, amount: newAmount } : member
    );
    onMembersChange(updatedMembers);
    setEditingMember(null);
    setEditAmount('');
  };

  const startEditingAmount = (member: GroupMember) => {
    setEditingMember(member.id);
    setEditAmount(member.amount.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Group Members</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(true)}
        >
          <Plus size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.addFormTitle}>Add Member</Text>
          <View style={styles.availableMembers}>
            {availableMembers
              .filter(name => !members.some(m => m.name === name))
              .map((name) => (
                <TouchableOpacity
                  key={name}
                  style={styles.availableMember}
                  onPress={() => addMember(name)}
                >
                  <Text style={styles.availableMemberText}>{name}</Text>
                </TouchableOpacity>
              ))}
          </View>
          <View style={styles.customMemberForm}>
            <TextInput
              style={styles.customMemberInput}
              placeholder="Or enter custom name"
              placeholderTextColor="#6B7280"
              value={newMemberName}
              onChangeText={setNewMemberName}
            />
            <TouchableOpacity
              style={styles.addCustomButton}
              onPress={() => {
                if (newMemberName.trim()) {
                  addMember(newMemberName.trim());
                }
              }}
            >
              <Text style={styles.addCustomText}>Add</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cancelAddButton}
            onPress={() => {
              setShowAddForm(false);
              setNewMemberName('');
            }}
          >
            <Text style={styles.cancelAddText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.membersList}>
        {members.map((member) => (
          <View key={member.id} style={styles.memberItem}>
            <View style={styles.memberInfo}>
              <View style={styles.avatar}>
                <User size={16} color="#9CA3AF" />
              </View>
              <View style={styles.memberDetails}>
                <Text style={styles.memberName}>{member.name}</Text>
                {editingMember === member.id ? (
                  <View style={styles.editAmountContainer}>
                    <TextInput
                      style={styles.editAmountInput}
                      value={editAmount}
                      onChangeText={setEditAmount}
                      keyboardType="numeric"
                      placeholder="Amount"
                      placeholderTextColor="#6B7280"
                    />
                    <TouchableOpacity
                      onPress={() => updateMemberAmount(member.id, parseFloat(editAmount) || 0)}
                      style={styles.saveAmountButton}
                    >
                      <Check size={14} color="#10B981" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setEditingMember(null);
                        setEditAmount('');
                      }}
                      style={styles.cancelAmountButton}
                    >
                      <X size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => splitType === 'custom' && startEditingAmount(member)}
                    disabled={splitType === 'equal'}
                  >
                    <Text style={[
                      styles.memberAmount,
                      splitType === 'custom' && styles.editableAmount
                    ]}>
                      ₹{member.amount.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeMemberButton}
              onPress={() => removeMember(member.id)}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {splitType === 'equal' && (
        <Text style={styles.splitInfo}>
          Equal split: ₹{totalAmount > 0 ? (totalAmount / members.length).toFixed(2) : '0.00'} per person
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addForm: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  addFormTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  availableMembers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  availableMember: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  availableMemberText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  customMemberForm: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  customMemberInput: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  addCustomButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addCustomText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cancelAddButton: {
    alignSelf: 'flex-start',
  },
  cancelAddText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  membersList: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  memberAmount: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  editableAmount: {
    textDecorationLine: 'underline',
  },
  editAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editAmountInput: {
    backgroundColor: '#1F2937',
    borderRadius: 6,
    padding: 4,
    fontSize: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B5563',
    width: 60,
  },
  saveAmountButton: {
    padding: 2,
  },
  cancelAmountButton: {
    padding: 2,
  },
  removeMemberButton: {
    padding: 4,
  },
  splitInfo: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});