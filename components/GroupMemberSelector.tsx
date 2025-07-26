import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { User, Check } from 'lucide-react-native';

interface GroupMemberSelectorProps {
  selectedMembers: string[];
  onSelectionChange: (members: string[]) => void;
  splitType: string;
}

const groupMembers = [
  { id: '1', name: 'John Doe', avatar: null },
  { id: '2', name: 'Sarah Smith', avatar: null },
  { id: '3', name: 'Mike Johnson', avatar: null },
  { id: '4', name: 'Emma Wilson', avatar: null },
];

export function GroupMemberSelector({ selectedMembers, onSelectionChange, splitType }: GroupMemberSelectorProps) {
  const [customAmounts, setCustomAmounts] = useState<{ [key: string]: string }>({});

  const toggleMember = (memberId: string) => {
    const isSelected = selectedMembers.includes(memberId);
    if (isSelected) {
      onSelectionChange(selectedMembers.filter(id => id !== memberId));
    } else {
      onSelectionChange([...selectedMembers, memberId]);
    }
  };

  const updateCustomAmount = (memberId: string, amount: string) => {
    setCustomAmounts(prev => ({ ...prev, [memberId]: amount }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Group Members</Text>
      <View style={styles.membersList}>
        {groupMembers.map((member) => {
          const isSelected = selectedMembers.includes(member.id);
          return (
            <View key={member.id} style={styles.memberContainer}>
              <TouchableOpacity
                style={styles.memberItem}
                onPress={() => toggleMember(member.id)}
              >
                <View style={styles.memberInfo}>
                  <View style={styles.avatar}>
                    <User size={16} color="#9CA3AF" />
                  </View>
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
                <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]}>
                  {isSelected && <Check size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
              
              {isSelected && splitType === 'Custom Split' && (
                <View style={styles.customAmountContainer}>
                  <TextInput
                    style={styles.customAmountInput}
                    placeholder="Enter amount"
                    placeholderTextColor="#6B7280"
                    value={customAmounts[member.id] || ''}
                    onChangeText={(text) => updateCustomAmount(member.id, text)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  membersList: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  memberContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  customAmountContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  customAmountInput: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
});