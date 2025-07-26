import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { GroupItem } from './GroupItem';
import { CategoryManager } from './CategoryManager';
import { FriendManager } from './FriendManager';
import { PaymentModeManager } from './PaymentModeManager';

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
  paymentMode?: string;
}

const initialGroups: Group[] = [
  { 
    id: '1', 
    totalAmount: '₹2,400', 
    myShare: '₹600', 
    description: 'Team lunch', 
    date: '2025-01-01',
    paymentMode: 'UPI',
    members: [
      { id: '1', name: 'John', amount: 600, settled: false },
      { id: '2', name: 'Sarah', amount: 600, settled: true },
      { id: '3', name: 'Mike', amount: 600, settled: false },
      { id: '4', name: 'Me', amount: 600, settled: false }
    ],
    splitType: 'equal' as const
  },
  { 
    id: '2', 
    totalAmount: '₹1,800', 
    myShare: '₹450', 
    description: 'Movie night', 
    date: '2024-12-30',
    paymentMode: 'Credit Card',
    members: [
      { id: '5', name: 'Emma', amount: 450, settled: true },
      { id: '6', name: 'David', amount: 450, settled: false },
      { id: '7', name: 'Lisa', amount: 450, settled: true },
      { id: '8', name: 'Me', amount: 450, settled: false }
    ],
    splitType: 'equal' as const
  },
  { 
    id: '3', 
    totalAmount: '₹12,000', 
    myShare: '₹3,000', 
    description: 'Weekend trip expenses', 
    date: '2024-12-28',
    paymentMode: 'Cash',
    members: [
      { id: '9', name: 'Alex', amount: 3000, settled: false },
      { id: '10', name: 'Sophie', amount: 3000, settled: false },
      { id: '11', name: 'Tom', amount: 3000, settled: true },
      { id: '12', name: 'Me', amount: 3000, settled: false }
    ],
    splitType: 'equal' as const
  },
];

export function GroupList() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  const handleEditGroup = (updatedGroup: Group) => {
    setGroups(groups.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const handleSettleMember = (groupId: string, memberId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.map(member =>
            member.id === memberId ? { ...member, settled: !member.settled } : member
          )
        };
      }
      return group;
    }));
  };

  const handleDeleteMember = (groupId: string, memberId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const updatedMembers = group.members.filter(member => member.id !== memberId);
        
        // Recalculate amounts if equal split
        if (group.splitType === 'equal' && updatedMembers.length > 0) {
          const totalAmount = parseFloat(group.totalAmount.replace('₹', '').replace(',', ''));
          const equalShare = totalAmount / updatedMembers.length;
          const recalculatedMembers = updatedMembers.map(member => ({
            ...member,
            amount: equalShare
          }));
          
          return {
            ...group,
            members: recalculatedMembers,
            myShare: `₹${recalculatedMembers.find(m => m.name === 'Me')?.amount.toLocaleString() || '0'}`
          };
        }
        
        return {
          ...group,
          members: updatedMembers
        };
      }
      return group;
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Expenses</Text>
      <View style={styles.groupsList}>
        {groups.map((group) => (
          <GroupItem 
            key={group.id} 
            group={group}
            onEdit={handleEditGroup}
            onDelete={handleDeleteGroup}
            onSettleMember={handleSettleMember}
            onDeleteMember={handleDeleteMember}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  groupsList: {
    gap: 16,
  },
});