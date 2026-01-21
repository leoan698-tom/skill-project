# React Native 组件命名规范 (2026)

> 本规范基于 Airbnb、Meta 内部风格、Expo 生态、大厂 RN 项目及开源项目的最佳实践整理。

## 核心原则

**组件名 + 组件文件名 = PascalCase，保持一致**

这是目前 React Native 项目中最清晰、最被广泛接受的做法，能最大程度减少认知负担、提升可维护性。

---

## 1. 组件名称（export default）→ 必须使用 PascalCase

这是 React 生态铁律，几乎没有例外。

| 正确 ✅ | 错误 ❌ | 说明 |
|---------|---------|------|
| `PrimaryButton` | `primaryButton` | React 会把小写开头误认为是 HTML 标签 |
| `UserProfileCard` | `user-profile-card` | kebab-case 不能作为标识符 |
| `AppTextInput` | `apptextinput` | 难以阅读 |
| `LoadingOverlay` | `loadingoverlay` | 缺少词边界 |
| `AuthSocialButtons` | `authsocialbuttons` | — |

**为什么强制 PascalCase？**

React 需要通过首字母大写来区分：
- `<UserProfile />` → 自定义组件
- `<div />` / `<View />` → 原生 DOM / RN 内置组件

---

## 2. 组件文件名（.tsx）

### 最推荐（2025–2026 主流）：文件名 = 组件名

```
PrimaryButton.tsx      → export default function PrimaryButton()
UserAvatar.tsx         → export default function UserAvatar()
OrderSummaryCard.tsx   → export default function OrderSummaryCard()
BottomTabNavigator.tsx → export default function BottomTabNavigator()
```

### 次推荐（仍常见）：文件名用 camelCase

```
primaryButton.tsx → export default function PrimaryButton()
userAvatar.tsx    → export default function UserAvatar()
```

### 不推荐（越来越少）

- `primary-button.tsx`（kebab-case）
- `Primary_Button.tsx`（snake_case）

**结论**：文件名与导出的组件名保持 1:1 一致，使用 PascalCase 是最清晰的方式。

---

## 3. 文件扩展名选择

| 场景 | 推荐扩展名 | 说明 |
|------|-----------|------|
| 使用 TypeScript | `.tsx` | 绝大多数现代 RN 项目 |
| 纯 JS 项目 | `.jsx` 或 `.js` | `.jsx` 更能表达包含 JSX |
| 测试文件 | `.test.tsx` | Jest / Testing Library 惯例 |
| Storybook 故事 | `.stories.tsx` | — |
| 样式文件（如分离） | `.style.ts` | 少见，更多人直接写在组件里 |

---

## 4. 组件分类 & 文件夹结构

### 通用组件目录（按功能/语义分组）

```
src/
├── components/
│   ├── common/               # 基础通用组件（跨页面复用）
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── SecondaryButton.tsx
│   │   │   └── types.ts
│   │   ├── TextInput/
│   │   ├── Card/
│   │   ├── Loading/
│   │   └── EmptyState/
│   │
│   ├── layout/               # 布局组件
│   │   ├── Stack/
│   │   ├── HStack/
│   │   ├── VStack/
│   │   └── Grid/
│   │
│   ├── feedback/             # 反馈组件（提示、弹窗、Toast）
│   │   ├── Toast/
│   │   ├── AlertDialog/
│   │   └── Snackbar/
│   │
│   ├── media/                # 媒体组件（图片、头像、视频）
│   │   ├── UserAvatar/
│   │   ├── ImageCarousel/
│   │   └── VideoPlayer/
│   │
│   └── form/                 # 表单组件
│       ├── AppTextInput/
│       ├── AppSelect/
│       ├── FormErrorMessage/
│       └── Checkbox/
│
├── features/                 # 业务模块组件（与业务耦合）
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SocialLoginButtons.tsx
│   └── profile/
│       ├── ProfileHeader.tsx
│       └── EditAvatar.tsx
│
├── screens/                  # 完整页面
│   ├── HomeScreen.tsx
│   └── ProductDetailScreen.tsx
│
└── hooks/                    # 自定义 Hook
    ├── useAuth.ts
    ├── useDebounce.ts
    └── useUserProfile.ts
```

### 通用组件分类说明

| 分类 | 路径 | 说明 | 示例 |
|------|------|------|------|
| 基础组件 | `components/common/` | 最基础的 UI 元素 | Button, Card, Loading |
| 布局组件 | `components/layout/` | 空间排列、容器 | Stack, HStack, VStack, Grid |
| 反馈组件 | `components/feedback/` | 用户提示、弹窗 | Toast, AlertDialog, Snackbar |
| 媒体组件 | `components/media/` | 图片、视频、头像 | Avatar, ImageCarousel |
| 表单组件 | `components/form/` | 表单输入、选择器 | TextInput, Select, Checkbox |
| 业务组件 | `features/{module}/` | 与业务耦合的组件 | LoginForm, ProfileHeader |

### 文件夹命名

- **推荐**: `kebab-case` 或 `camelCase`
- **不建议**: PascalCase（除组件专属文件夹外）

```
✅ components/
✅ user-profile/
✅ features/auth/
❌ Components/
❌ UserProfile/（除非是组件文件夹如 Button/）
```

---

## 5. 特殊命名规范

### 自定义 Hook

```typescript
// 必须以 use 开头 + camelCase
const useAuth = () => { ... }
const useDebounce = (value, delay) => { ... }
const useUserProfile = (userId) => { ... }
```

### Context Provider

```typescript
// XxxProvider 格式
export const AuthProvider = ({ children }) => { ... }
export const ThemeProvider = ({ children }) => { ... }
```

### 高阶组件 (HOC)

```typescript
// withXxx 格式
export const withAuth = (Component) => { ... }
export const withLoading = (Component) => { ... }
```

### Props 接口

```typescript
// PascalCase + Props 后缀
interface ButtonProps {
  title: string;
  onPress: () => void;
}

interface UserCardProps {
  user: User;
  showAvatar?: boolean;
}
```

### 工具函数

```typescript
// camelCase
export const formatPrice = (price: number) => { ... }
export const calculateDiscount = (original, discount) => { ... }
export const validateEmail = (email: string) => { ... }
```

### 常量

```typescript
// UPPER_CASE 或 camelCase
export const API_BASE_URL = 'https://api.example.com';
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
export const defaultTheme = { ... }; // 对象常量可用 camelCase
```

### 类型/接口

```typescript
// PascalCase
type Theme = { ... }
interface UserProfile { ... }
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
```

---

## 6. 快速对照表

| 元素 | 命名法 | 示例 | 强制？ |
|------|--------|------|--------|
| 组件名 | PascalCase | `SubmitButton`, `ErrorMessage` | **是** |
| 组件文件名 | 同组件名 | `SubmitButton.tsx` | 强烈推荐 |
| Hook 名 | use + camelCase | `useUserProfile` | **是** |
| Props 接口 | PascalCase + Props | `ButtonProps` | 推荐 |
| 通用文件夹 | kebab-case / camelCase | `components`, `user-profile` | 推荐 |
| 页面/屏幕 | PascalCase + Screen | `CartScreen`, `CheckoutScreen` | 推荐 |
| Context | XxxProvider / XxxContext | `AuthProvider`, `ThemeContext` | 推荐 |
| HOC | withXxx | `withAuth`, `withLoading` | 推荐 |
| 工具函数 | camelCase | `formatPrice`, `validateEmail` | 推荐 |
| 常量 | UPPER_CASE | `API_BASE_URL`, `MAX_RETRY` | 推荐 |
| 类型/接口 | PascalCase | `User`, `Theme`, `ButtonVariant` | 推荐 |

---

## 7. 命名示例

### 完整组件示例

```typescript
// components/Button/PrimaryButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  size = 'md',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[size], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { /* ... */ },
  sm: { height: 32 },
  md: { height: 40 },
  lg: { height: 48 },
  disabled: { opacity: 0.5 },
  text: { /* ... */ },
});

export default PrimaryButton;
```

### 页面组件示例

```typescript
// screens/ProductDetailScreen.tsx

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ProductHeader, ProductInfo, AddToCartButton } from '@/components';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product, isLoading } = useProductDetail(id);

  if (isLoading) return <LoadingScreen />;

  return (
    <ScrollView>
      <ProductHeader product={product} />
      <ProductInfo product={product} />
      <AddToCartButton productId={id} />
    </ScrollView>
  );
}
```

---

## 8. 常见错误与修正

| 错误写法 | 正确写法 | 问题 |
|----------|----------|------|
| `button.tsx` | `Button.tsx` | 文件名应与组件名一致 |
| `export default primaryButton` | `export default PrimaryButton` | 组件必须 PascalCase |
| `const getUserData = () => {}` (Hook) | `const useUserData = () => {}` | Hook 必须 use 开头 |
| `interface buttonProps` | `interface ButtonProps` | 接口必须 PascalCase |
| `const THEME = { colors: {} }` | `const theme = { colors: {} }` | 对象常量用 camelCase |
| `<userCard />` | `<UserCard />` | JSX 组件必须大写开头 |

---

## 9. 检查清单

在代码审查或生成组件时，确认以下事项：

- [ ] 组件名是否为 PascalCase？
- [ ] 文件名是否与组件名一致？
- [ ] Hook 是否以 `use` 开头？
- [ ] Props 接口是否以 `Props` 结尾？
- [ ] 文件夹名是否为 kebab-case 或 camelCase？
- [ ] 页面组件是否以 `Screen` 结尾？
- [ ] 类型/接口是否为 PascalCase？

---

## 总结

> **强烈建议不要偏离 PascalCase 组件命名这条红线**

统一的命名规范能够：
1. 提高代码可读性
2. 便于 IDE 自动补全和导航
3. 减少团队沟通成本
4. 符合 React 生态惯例
