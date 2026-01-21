import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Design Tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const colors = {
  light: {
    primary: '#007AFF',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F9FAFB',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    borderDefault: '#E5E7EB',
  },
  dark: {
    primary: '#007AFF',
    bgPrimary: '#000000',
    bgSecondary: '#1C1C1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    borderDefault: '#38383A',
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mock Data (后续替换为 API 调用)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const mockData = {
  // TODO: 定义页面数据结构
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ScreenParams {
  id?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Screen Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function TemplateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<ScreenParams>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;

  // ━━━ State Management ━━━
  // TODO: 添加状态管理

  // ━━━ Effects ━━━
  // TODO: 添加数据获取逻辑

  // ━━━ Handlers ━━━
  // TODO: 添加事件处理函数

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgSecondary }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: theme.bgPrimary }]}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          页面标题
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TODO: 添加页面内容区域 */}
        <View style={[styles.section, { backgroundColor: theme.bgPrimary }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            内容区块
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Fixed Bar (Optional) */}
      {/* 
      <View style={[styles.bottomBar, { backgroundColor: theme.bgPrimary }]}>
        <PrimaryButton title="操作按钮" onPress={() => {}} />
      </View>
      */}
    </SafeAreaView>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Styles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    marginBottom: 12,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});
