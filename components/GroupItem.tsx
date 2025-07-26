import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Users as Users2, Calendar, ChevronDown, ChevronUp, Trash2, Check, X, CreditCard as Edit, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';
import { GroupEditForm } from './GroupEditForm';

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
  category: string;
  members: GroupMember[];
  splitType: 'equal' | 'custom';
  paymentMode?: string;
}

interface GroupItemProps {
  group: Group;
  onEdit: (group: Group) => void;
  onDelete: (groupId: string) => void;
  onSettleMember: (groupId: string, memberId: string) => void;
  onDeleteMember: (groupId: string, memberId: string) => void;
}

export function GroupItem({ group, onEdit, onDelete, onSettleMember, onDeleteMember }: GroupItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteGroup = () => {
    if (typeof onDelete === 'function') {
      Alert.alert(
        'Delete Group Expense',
        'Are you sure you want to delete this entire group expense?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => onDelete(group.id) }
        ]
      );
    }
  };

  const handleDeleteMember = (memberId: string, memberName: string) => {
    if (onDeleteMember) {
      Alert.alert(
        'Remove Member',
        `Remove ${memberName} from this expense?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => onDeleteMember(group.id, memberId) }
        ]
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedGroup: Group) => {
    onEdit(updatedGroup);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const totalSettled = group.members.filter(m => m.settled).length;
  const totalMembers = group.members.length;

  if (isEditing) {
    return (
      <GroupEditForm
        group={group}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <LinearGradient
      colors={['#1F2937', '#374151']}
      style={styles.item}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.groupIndicator} />
          <View style={styles.titleContainer}>
            <Users2 size={20} color="#10B981" />
            <Text style={styles.description}>{group.description}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              onPress={handleEdit} 
              style={styles.actionButton}
            >
              <Edit size={16} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleDeleteGroup} 
              style={styles.actionButton}
              disabled={typeof onDelete !== 'function'}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.dateContainer}>
            <Calendar size={16} color="#9CA3AF" />
            <Text style={styles.date}>{group.date}</Text>
          </View> 
          {/* Category display */}
          {group.category && (
            <View style={styles.categoryContainer}>
              
              <Text style={styles.category}>{group.category}</Text>
            </View>
          )}
          {group.paymentMode && (
            <View style={styles.paymentModeContainer}>
              <Text style={styles.paymentMode}>Payment: {group.paymentMode}</Text>
            </View>
          )}
        </View>

        <View style={styles.amountContainer}>
          <View style={styles.amountItem}>
            <Text style={styles.amountLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{group.totalAmount.replace('₹', '')}</Text>
          </View>
          <View style={styles.amountItem}>
            <Text style={styles.amountLabel}>My Share</Text>
            <Text style={styles.myShare}>₹{group.myShare.replace('₹', '')}</Text>
          </View>
          <View style={styles.amountItem}>
            <Text style={styles.amountLabel}>Settled</Text>
            <Text style={styles.settledCount}>{totalSettled}/{totalMembers}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Text style={styles.expandText}>
            {isExpanded ? 'Hide Members' : 'Show Members'}
          </Text>
          {isExpanded ? (
            <ChevronUp size={20} color="#3B82F6" />
          ) : (
            <ChevronDown size={20} color="#3B82F6" />
          )}
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.membersList}>
            {group.members.map((member) => (
              <View key={member.id} style={styles.memberRow}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={styles.memberAmount}>
                    <Text style={styles.amountText}>₹{member.amount.toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.memberActions}>
                  <TouchableOpacity
                    style={styles.settleButton}
                    onPress={() => onSettleMember(group.id, member.id)}
                  >
                    {member.settled ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : (
                      <Circle size={16} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteMember(member.id, member.name)}
                  >
                    <Trash2 size={14} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    gap: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 4,
  },
  category: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  item: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  content: {
    gap: 12,
  },
  groupIndicator: {
    width: 4,
    height: 60,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  paymentModeContainer: {
    marginLeft: 16,
  },
  paymentMode: {
    fontSize: 12,
    color: '#F59E0B',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  amountItem: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  myShare: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  settledCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 12,
  },
  expandText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  membersList: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  memberAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amountText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settleButton: {
    padding: 4,
  },
  deleteButton: {
    padding: 4,
  },
});