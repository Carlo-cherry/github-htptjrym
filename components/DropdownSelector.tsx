import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react-native';

interface DropdownSelectorProps {
  label: string;
  value: string;
  onSelect: (value: string) => void;
  options: string[];
  placeholder: string;
  icon?: ReactNode;
}

export function DropdownSelector({
  label,
  value,
  onSelect,
  options,
  placeholder,
  icon,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsOpen(!isOpen)}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.selectorText, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <ChevronDown size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.optionsList} nestedScrollEnabled>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 16,
  },
  icon: {
    marginRight: 8,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  placeholder: {
    color: '#6B7280',
  },
  dropdown: {
    backgroundColor: '#111827',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginTop: 8,
    maxHeight: 200,
  },
  optionsList: {
    maxHeight: 200,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});