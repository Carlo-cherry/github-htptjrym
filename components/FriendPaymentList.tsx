import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { FriendPaymentItem } from './FriendPaymentItem';

interface FriendPaymentListProps {
  type: 'my-payments' | 'other-payments';
}

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

const initialMyPayments: FriendPayment[] = [
  { id: '1', friend: 'John Doe', amount: '₹500', description: 'Lunch payment', date: '2025-01-01', category: 'Food', settled: false },
  { id: '2', friend: 'Sarah Smith', amount: '₹800', description: 'Movie tickets', date: '2024-12-30', category: 'Entertainment', settled: true },
];

const initialOtherPayments: FriendPayment[] = [
  { id: '3', friend: 'Mike Johnson', amount: '₹1,200', description: 'Dinner split', date: '2024-12-29', category: 'Food', settled: false },
  { id: '4', friend: 'Emma Wilson', amount: '₹600', description: 'Travel expenses', date: '2024-12-28', category: 'Transportation', settled: true },
];

export function FriendPaymentList({ type }: FriendPaymentListProps) {
  const [myPayments, setMyPayments] = useState<FriendPayment[]>(initialMyPayments);
  const [otherPayments, setOtherPayments] = useState<FriendPayment[]>(initialOtherPayments);
  
  const payments = type === 'my-payments' ? myPayments : otherPayments;
  const title = type === 'my-payments' ? 'Money I Owe' : 'Money Owed to Me';

  // Separate settled and not settled payments
  const settledPayments = payments.filter(payment => payment.settled);
  const notSettledPayments = payments.filter(payment => !payment.settled);

  const handleEditPayment = (updatedPayment: FriendPayment) => {
    if (type === 'my-payments') {
      setMyPayments(myPayments.map(payment => 
        payment.id === updatedPayment.id ? updatedPayment : payment
      ));
    } else {
      setOtherPayments(otherPayments.map(payment => 
        payment.id === updatedPayment.id ? updatedPayment : payment
      ));
    }
  };

  const handleDeletePayment = (paymentId: string) => {
    if (type === 'my-payments') {
      setMyPayments(myPayments.filter(payment => payment.id !== paymentId));
    } else {
      setOtherPayments(otherPayments.filter(payment => payment.id !== paymentId));
    }
  };

  const handleToggleSettle = (paymentId: string) => {
    if (type === 'my-payments') {
      setMyPayments(myPayments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, settled: !payment.settled } 
          : payment
      ));
    } else {
      setOtherPayments(otherPayments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, settled: !payment.settled } 
          : payment
      ));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {/* Not Settled Section */}
      {notSettledPayments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Not Settled ({notSettledPayments.length})</Text>
          <View style={styles.paymentsList}>
            {notSettledPayments.map((payment) => (
              <FriendPaymentItem 
                key={payment.id} 
                payment={payment} 
                type={type}
                onEdit={handleEditPayment}
                onDelete={handleDeletePayment}
                onToggleSettle={handleToggleSettle}
              />
            ))}
          </View>
        </View>
      )}

      {/* Settled Section */}
      {settledPayments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settled ({settledPayments.length})</Text>
          <View style={styles.paymentsList}>
            {settledPayments.map((payment) => (
              <FriendPaymentItem 
                key={payment.id} 
                payment={payment} 
                type={type}
                onEdit={handleEditPayment}
                onDelete={handleDeletePayment}
                onToggleSettle={handleToggleSettle}
              />
            ))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {payments.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No payments found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  paymentsList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});