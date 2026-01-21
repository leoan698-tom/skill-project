import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
  TextStyle,
} from 'react-native';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Design Tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const colors = {
  light: {
    primary: '#007AFF',
    bgPrimary: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    borderDefault: '#E5E7EB',
  },
  dark: {
    primary: '#007AFF',
    bgPrimary: '#000000',
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    borderDefault: '#38383A',
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ComponentNameProps {
  // 必需属性
  title: string;
  onPress: () => void;
  // 可选属性
  subtitle?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onPress,
  subtitle,
  disabled = false,
  style,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.bgPrimary, borderColor: theme.borderDefault },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Styles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const styles = StyleSheet.create({
  container: {
    borderRadius: 16, // radius-lg
    padding: 16, // lg spacing
    borderWidth: 1,
    // shadow-md
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18, // title-md
    lineHeight: 26,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15, // body-md
    lineHeight: 22,
    fontWeight: '400',
    marginTop: 4, // xs spacing
  },
});

export default ComponentName;
