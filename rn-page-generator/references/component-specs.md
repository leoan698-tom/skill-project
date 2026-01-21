# Component Specs - 核心组件规范

已存在的核心组件清单，生成新代码时优先复用这些组件。

## PrimaryButton 主按钮

**路径**: `components/ui/PrimaryButton.tsx`

**作用**: 统一的主按钮组件，支持多种变体

### 规格

| 属性 | 值 |
|------|-----|
| 变体 | solid / outline / ghost / text |
| 高度 | 48 (大) / 40 (中) / 32 (小) |
| 圆角 | radius-md (12) |
| paddingHorizontal | 24 (大) / 20 (中) / 16 (小) |
| 文字 | title-md (大/中) / body-md (小) |

### 变体样式

| 变体 | 背景 | 文字 | 边框 |
|------|------|------|------|
| solid | primary | white | 无 |
| outline | transparent | primary | 2px primary |
| ghost | transparent | primary | 无 |
| text | transparent | primary | 无 |

### 状态

- **禁用态**: opacity=0.5 + pointerEvents='none'
- **加载态**: ActivityIndicator + 文字变为 "加载中..."
- **触碰反馈**: activeOpacity=0.7

### Props 接口

```typescript
interface PrimaryButtonProps {
  title: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'text';
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

---

## AppInput 输入框

**路径**: `components/ui/AppInput.tsx`

**作用**: 统一的输入框组件

### 规格

| 属性 | 值 |
|------|-----|
| 高度 | 48 |
| 圆角 | radius-md (12) |
| padding | 14 |
| borderWidth | 1 (默认) / 2 (聚焦) |
| borderColor-default | border-default |
| borderColor-focus | border-focus |
| borderColor-error | border-error |
| 文字 | body-lg |
| placeholderTextColor | text-tertiary |

### 功能支持

- leftIcon: 左侧图标
- rightIcon: 右侧图标
- clearButton: 清除按钮
- secureTextEntry: 密码输入
- error 状态: 下方显示红色错误文字 (body-sm)

### Props 接口

```typescript
interface AppInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  secureTextEntry?: boolean;
  error?: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
```

---

## Card 卡片

**路径**: `components/ui/Card.tsx`

**作用**: 通用卡片容器

### 规格

| 属性 | 值 |
|------|-----|
| 背景 | bg-primary |
| 圆角 | radius-lg (16) |
| padding | 16 |
| 阴影 | shadow-md |
| 触碰反馈 | activeOpacity=0.7 (仅 onPress 时) |

### 功能支持

- onPress: 可点击
- header: 头部插槽
- footer: 底部插槽

### Props 接口

```typescript
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
}
```

---

## Badge 徽章

**路径**: `components/ui/Badge.tsx`

**作用**: 小标签/徽章

### 规格

| 属性 | 值 |
|------|-----|
| 高度 | 24 |
| 圆角 | radius-pill (9999) |
| paddingHorizontal | 12 |
| 文字 | caption + fontWeight 600 |

### 变体色

| 变体 | 背景 | 文字 |
|------|------|------|
| primary | primary | white |
| success | success | white |
| warning | warning | white |
| danger | danger | white |
| neutral | bg-tertiary | text-secondary |

### Props 接口

```typescript
interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}
```

---

## Avatar 头像

**路径**: `components/ui/Avatar.tsx`

**作用**: 用户头像

### 规格

| size | 尺寸 | 在线指示点直径 |
|------|------|---------------|
| sm | 32 | 6.4 |
| md | 48 | 9.6 |
| lg | 64 | 12.8 |
| xl | 80 | 16 |

- 圆角: 完整圆形 (size/2)
- 在线状态指示点: 右下角,绿色 (#34C759)
- 加载态: skeleton 动画

### Props 接口

```typescript
interface AvatarProps {
  source: ImageSourcePropType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}
```

---

## SearchBar 搜索框

**路径**: `components/ui/SearchBar.tsx`

**作用**: 搜索输入框

### 规格

| 属性 | 值 |
|------|-----|
| 高度 | 48 |
| 圆角 | radius-md (12) |
| 左侧图标 | Feather 'search' |
| 右侧按钮 | 清除按钮 (有文字时显示) |
| focus 状态 | 边框高亮 (border-focus) |

### Props 接口

```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}
```

---

## 组件使用原则

1. **优先复用**: 生成页面时，优先复用以上已有组件
2. **禁止重造**: 相似功能的新组件必须模仿这些组件的结构/命名/样式
3. **扩展规则**: 需要变体时，在这些组件基础上扩展，而非推翻重写
4. **风格一致**: 新组件必须严格遵守设计令牌系统

---

## 常用组合模式

### 表单区块

```typescript
<View style={styles.formSection}>
  <Text style={styles.sectionTitle}>登录信息</Text>
  <AppInput
    placeholder="请输入手机号"
    leftIcon={<PhoneIcon />}
    keyboardType="phone-pad"
  />
  <AppInput
    placeholder="请输入密码"
    secureTextEntry
    leftIcon={<LockIcon />}
  />
  <PrimaryButton title="登录" onPress={handleLogin} />
</View>
```

### 列表项卡片

```typescript
<Card onPress={handlePress}>
  <View style={styles.row}>
    <Avatar source={{ uri: avatarUrl }} size="md" />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Badge text="新" variant="primary" />
  </View>
</Card>
```

### 搜索结果页

```typescript
<SafeAreaView style={styles.container}>
  <SearchBar
    value={keyword}
    onChangeText={setKeyword}
    onSubmit={handleSearch}
  />
  <FlatList
    data={results}
    renderItem={({ item }) => <ProductCard {...item} />}
    keyExtractor={(item) => item.id}
  />
</SafeAreaView>
```
