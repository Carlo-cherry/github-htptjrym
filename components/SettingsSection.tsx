import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Tag, Users, CreditCard, Cloud, Bell, Shield } from 'lucide-react-native';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void;
}

const iconMap = {
  Tag,
  Users,
  CreditCard,
  Cloud,
  Bell,
  Shield,
};

export function SettingsSection({ title, description, icon, onPress }: SettingsSectionProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#1F2937', '#374151']}
        style={styles.section}
      >
        <View style={styles.content}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <IconComponent size={20} color="#3B82F6" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});