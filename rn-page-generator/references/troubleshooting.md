# React Native 问题排查知识库

系统性记录 React Native 开发中的常见问题及解决方案，建立完整的问题-解决方案知识库。

## 目录索引

| 分类 | 问题数量 | 快速链接 |
|------|----------|----------|
| 渲染错误 | 5 | [跳转](#一渲染错误) |
| 布局问题 | 6 | [跳转](#二布局问题) |
| 样式问题 | 4 | [跳转](#三样式问题) |
| 交互问题 | 6 | [跳转](#四交互问题) |
| 适配问题 | 4 | [跳转](#五适配问题) |

---

## 一、渲染错误

### RN-RENDER-001: 条件渲染 Falsy 值陷阱

**问题现象**
```
Error: Text strings must be rendered within a <Text> component
```
页面出现多个相同错误，数量与列表项数量一致。

**影响范围**
- 所有使用 `{variable && <Component />}` 的条件渲染
- 数据库 tinyint 字段 (0/1)
- 可选字符串字段 (可能为 "")
- 计数器/数量字段 (可能为 0)
- 可空对象/数组

**根本原因**
React Native 与 Web React 的关键差异：
- Web React: falsy 值渲染为 DOM 节点，显示 "0" 或空内容
- React Native: falsy 值 (0, "", null, undefined) 直接导致**运行时崩溃**

当条件表达式返回 0 或 "" 时，RN 尝试将其渲染为内容，但原始数据类型未被 `<Text>` 包裹。

**解决方案**

| 场景 | 错误写法 | 正确写法 |
|------|----------|----------|
| 通用 | `{variable && <C />}` | `{!!variable && <C />}` |
| 数字 | `{count && <C />}` | `{count > 0 && <C />}` |
| 字符串 | `{text && <C />}` | `{!!text && <C />}` |
| 对象 | `{obj && <C />}` | `{!!obj && <C />}` |

**代码示例**
```typescript
// ✅ 正确：使用 !! 强制转换
{!!template.isManagementOnly && (
  <View style={styles.badge}>
    <Text>仅管理层</Text>
  </View>
)}

// ✅ 正确：数字类型显式比较
{item.count > 0 && <Badge count={item.count} />}

// ✅ 正确：字符串长度检查
{!!description && <Text>{description}</Text>}
```

**预防措施**
- [ ] 代码审查时检查所有条件渲染表达式
- [ ] 数据库 tinyint 字段必须用 `!!` 处理
- [ ] 可选字段默认使用 `!!` 转换

**验证方法**
1. 检查 Metro bundler 控制台无报错
2. 列表渲染无重复错误
3. 所有条件区域正常显示/隐藏

---

### RN-RENDER-002: 列表 Key 重复或无效

**问题现象**
```
Warning: Each child in a list should have a unique "key" prop
```
列表渲染异常，更新时出现闪烁或错位。

**影响范围**
- FlatList、SectionList 组件
- map() 渲染的列表
- 动态增删的列表项

**根本原因**
- 使用数组索引作为 key
- key 值重复
- key 值类型不是 string

**解决方案**
```typescript
// ✅ 正确：使用唯一 ID 并转换为 string
<FlatList
  data={items}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <ItemCard item={item} />}
/>

// ✅ 正确：组合字段生成唯一 key
keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
```

**预防措施**
- [ ] keyExtractor 必须返回 string 类型
- [ ] 优先使用业务唯一标识 (id, uuid)
- [ ] 禁止单独使用数组索引作为 key

---

### RN-RENDER-003: 图片加载失败无反馈

**问题现象**
- 图片区域显示空白
- 无加载状态提示
- 用户不知道图片是否在加载

**影响范围**
- 网络图片加载
- 用户头像
- 商品图片

**根本原因**
Image 组件默认无加载态和错误态处理。

**解决方案**
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

<View style={styles.imageContainer}>
  {loading && <ActivityIndicator style={styles.loader} />}
  {error && <View style={styles.placeholder}><Text>加载失败</Text></View>}
  <Image
    source={{ uri: imageUrl }}
    style={[styles.image, error && styles.hidden]}
    onLoadStart={() => setLoading(true)}
    onLoadEnd={() => setLoading(false)}
    onError={() => { setError(true); setLoading(false); }}
  />
</View>
```

**预防措施**
- [ ] 所有网络图片必须有加载态
- [ ] 必须有错误态占位图
- [ ] 考虑使用图片缓存库

---

### RN-RENDER-004: 空数据渲染异常

**问题现象**
- 数据为空时页面空白
- 列表无内容时无任何提示
- undefined.map() 报错

**根本原因**
未处理空数据状态，直接对 undefined/null 调用方法。

**解决方案**
```typescript
// ✅ 正确：完整的状态处理
{loading && <LoadingSkeleton />}
{error && <ErrorState onRetry={refetch} />}
{!loading && !error && data?.length === 0 && (
  <EmptyState message="暂无数据" />
)}
{!loading && !error && data?.length > 0 && (
  <FlatList data={data} ... />
)}

// ✅ FlatList 内置空状态
<FlatList
  data={data ?? []}
  ListEmptyComponent={<EmptyState />}
/>
```

**预防措施**
- [ ] 必须处理 loading/error/empty 三种状态
- [ ] 使用可选链 ?. 访问可能为空的属性
- [ ] 使用空值合并 ?? 提供默认值

---

### RN-RENDER-005: 异步状态导致组件已卸载警告

**问题现象**
```
Warning: Can't perform a React state update on an unmounted component
```

**根本原因**
组件卸载后，异步操作完成时仍尝试更新状态。

**解决方案**
```typescript
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const result = await api.getData();
    if (isMounted) {
      setData(result);
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false;
  };
}, []);
```

**预防措施**
- [ ] 异步操作前检查组件挂载状态
- [ ] 使用 AbortController 取消请求
- [ ] 清理 useEffect 返回的清理函数

---

## 二、布局问题

### RN-LAYOUT-001: Badge/标签宽度拉伸

**问题现象**
Badge、Tag 等组件边框拉伸到父容器宽度，而非自适应内容宽度。

**影响范围**
- 状态标签
- 副职/职位标签
- 任何需要"包裹内容"的小型 UI 元素

**根本原因**
- Web: inline/inline-flex 元素自动收缩到内容宽度
- RN: View 默认 `alignSelf: 'stretch'` 拉伸到父容器

**解决方案**
```typescript
// ✅ 正确：添加 alignSelf: 'flex-start'
badge: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',  // 关键
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#FDBA74',
},
```

**预防措施**
- [ ] 所有 Badge/Tag 组件必须设置 alignSelf
- [ ] 组件规范中明确标注此要求

---

### RN-LAYOUT-002: Flexbox 方向差异

**问题现象**
布局与预期相反，子元素垂直排列而非水平排列。

**根本原因**
- Web CSS: 默认 `flex-direction: row`
- React Native: 默认 `flexDirection: 'column'`

**解决方案**
```typescript
// ✅ 显式指定方向
row: {
  flexDirection: 'row',
  alignItems: 'center',
},
column: {
  flexDirection: 'column',
},
```

**预防措施**
- [ ] 始终显式指定 flexDirection
- [ ] 使用预定义的 row/column 样式

---

### RN-LAYOUT-003: 绝对定位元素溢出

**问题现象**
绝对定位元素超出父容器显示范围被裁切。

**根本原因**
父容器默认 `overflow: 'hidden'`。

**解决方案**
```typescript
// ✅ 父容器允许溢出
container: {
  position: 'relative',
  overflow: 'visible',  // 允许子元素溢出
},

// ✅ 或提升绝对定位元素层级
absoluteChild: {
  position: 'absolute',
  zIndex: 10,
  elevation: 10,  // Android
},
```

---

### RN-LAYOUT-004: 文本溢出处理

**问题现象**
长文本未截断，撑开容器或布局错乱。

**解决方案**
```typescript
// ✅ 单行省略
<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
  {longText}
</Text>

// ✅ 多行限制
<Text numberOfLines={2} ellipsizeMode="tail">
  {description}
</Text>

// ✅ 样式配合
title: {
  flex: 1,  // 允许收缩
},
```

---

### RN-LAYOUT-005: 图片尺寸异常

**问题现象**
图片显示为 0x0 或拉伸变形。

**根本原因**
- Image 组件必须有明确尺寸
- 未设置 resizeMode

**解决方案**
```typescript
// ✅ 固定尺寸
<Image
  source={{ uri: url }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>

// ✅ 比例约束
<Image
  source={{ uri: url }}
  style={{ width: '100%', aspectRatio: 16/9 }}
  resizeMode="cover"
/>
```

---

### RN-LAYOUT-006: ScrollView 内容不滚动

**问题现象**
ScrollView 内容不可滚动，或高度异常。

**根本原因**
- 父容器未设置 flex: 1
- ScrollView 自身未填充剩余空间

**解决方案**
```typescript
// ✅ 正确：完整的容器层级
<View style={{ flex: 1 }}>
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 20 }}
  >
    {/* 内容 */}
  </ScrollView>
</View>
```

---

## 三、样式问题

### RN-STYLE-001: 颜色值不规范

**问题现象**
界面颜色与设计稿不一致，或存在硬编码颜色。

**解决方案**
```typescript
// ❌ 禁止硬编码
backgroundColor: '#3498db',

// ✅ 使用设计令牌
backgroundColor: theme.colors.primary,  // #007AFF
```

**预防措施**
- [ ] 所有颜色必须来自 design-tokens.md
- [ ] 代码审查检查硬编码颜色值
- [ ] 使用 ESLint 规则检测

---

### RN-STYLE-002: 间距不符合规范

**问题现象**
组件间距不统一，使用非 4 倍数值。

**解决方案**
```typescript
// ❌ 禁止
padding: 15,
margin: 18,

// ✅ 使用 4 的倍数
padding: 16,  // lg
margin: 20,   // xl
```

**合法间距值**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

---

### RN-STYLE-003: 阴影样式不一致

**问题现象**
- iOS 和 Android 阴影效果不同
- 自定义阴影与系统不统一

**解决方案**
```typescript
// ✅ 使用预定义阴影
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};
```

---

### RN-STYLE-004: 圆角不统一

**问题现象**
组件圆角值混乱，与设计系统不符。

**解决方案**
```typescript
// ✅ 使用预定义圆角
const radius = {
  xs: 4,
  sm: 8,
  md: 12,   // 按钮、输入框
  lg: 16,   // 卡片
  xl: 20,
  pill: 9999,  // 胶囊形
};
```

---

## 四、交互问题

### RN-INTERACT-001: Toast 被 Modal 遮挡 / 阻塞交互

**问题现象**
- Toast 提示被弹窗遮挡
- Toast 显示时页面无法滚动/点击
- 使用 Modal 包裹 Toast 导致交互阻塞

**影响范围**
- 全局 Toast 提示
- 轻量通知组件
- 操作反馈提示

**根本原因**
Modal 创建独立原生视图层级，即使设置 `pointerEvents="box-none"` 仍会阻止底层交互。

**解决方案**
```typescript
// ✅ 正确：使用绝对定位替代 Modal
export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }], opacity },
      ]}
      pointerEvents="auto"
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <X size={16} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
```

**组件类型选择**
| 组件类型 | 推荐方案 | 原因 |
|---------|---------|------|
| Toast/Snackbar | 绝对定位 | 不阻塞交互 |
| 确认弹窗 | Modal | 需要用户响应 |
| 表单弹窗 | Modal | 需要聚焦操作 |

**预防措施**
- [ ] Toast 类组件禁止使用 Modal
- [ ] 必须设置 zIndex + elevation
- [ ] 确保不阻塞页面滚动

---

### RN-INTERACT-002: Modal 内 ScrollView 滚动冲突

**问题现象**
Modal 内的 ScrollView 无法正常滚动，或与外层滚动冲突。

**解决方案**
```typescript
// ✅ 添加 nestedScrollEnabled
<Modal visible={visible}>
  <View style={styles.modalContainer}>
    <ScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={true}
    >
      {/* 内容 */}
    </ScrollView>
  </View>
</Modal>
```

---

### RN-INTERACT-003: 触摸事件穿透

**问题现象**
点击遮罩层时事件穿透到底层元素。

**解决方案**
```typescript
// ✅ 遮罩层阻止事件
<TouchableOpacity
  style={styles.overlay}
  activeOpacity={1}
  onPress={onClose}
>
  <TouchableOpacity
    activeOpacity={1}
    onPress={(e) => e.stopPropagation()}  // RN 中实际无效
  >
    <View style={styles.content}>
      {/* 内容区域不响应遮罩点击 */}
    </View>
  </TouchableOpacity>
</TouchableOpacity>

// ✅ 更好的方案：分离遮罩和内容
<View style={styles.container}>
  <TouchableOpacity style={styles.overlay} onPress={onClose} />
  <View style={styles.content} pointerEvents="box-none">
    {/* 内容 */}
  </View>
</View>
```

---

### RN-INTERACT-004: 按钮连续点击

**问题现象**
按钮被快速连续点击，触发多次提交。

**解决方案**
```typescript
const [submitting, setSubmitting] = useState(false);

const handlePress = async () => {
  if (submitting) return;
  setSubmitting(true);
  
  try {
    await submitAction();
  } finally {
    setSubmitting(false);
  }
};

<TouchableOpacity
  onPress={handlePress}
  disabled={submitting}
  style={[styles.button, submitting && styles.disabled]}
>
  {submitting ? <ActivityIndicator /> : <Text>提交</Text>}
</TouchableOpacity>
```

---

### RN-INTERACT-005: FlatList 点击无响应

**问题现象**
FlatList 列表项点击事件不触发。

**根本原因**
- 手势冲突
- TouchableOpacity 嵌套问题

**解决方案**
```typescript
// ✅ 正确配置
<FlatList
  data={data}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.item}>
        {/* 内容 */}
      </View>
    </TouchableOpacity>
  )}
  scrollEnabled={true}
  keyboardShouldPersistTaps="handled"
/>
```

---

### RN-INTERACT-006: 下拉框选择器问题

**问题现象**
- Picker 组件在 iOS/Android 表现不一致
- 无法显示已选择的值
- 样式无法自定义

**解决方案**
使用自定义下拉框替代 Picker：
```typescript
const [showDropdown, setShowDropdown] = useState(false);
const [selected, setSelected] = useState<number | null>(null);

<TouchableOpacity
  style={styles.dropdown}
  onPress={() => setShowDropdown(!showDropdown)}
>
  <Text>{selected ? items.find(i => i.id === selected)?.name : '请选择'}</Text>
  <ChevronDown size={16} />
</TouchableOpacity>

{showDropdown && (
  <View style={styles.dropdownList}>
    <ScrollView nestedScrollEnabled={true}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            setSelected(item.id);
            setShowDropdown(false);
          }}
        >
          <Text style={selected === item.id && styles.selectedText}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}
```

---

## 五、适配问题

### RN-ADAPT-001: 安全区适配

**问题现象**
- 内容被刘海屏遮挡
- 底部内容被手势条遮挡
- 挖孔屏显示异常

**解决方案**
```typescript
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// ✅ 页面级使用 SafeAreaView
<SafeAreaView style={{ flex: 1 }}>
  {/* 页面内容 */}
</SafeAreaView>

// ✅ 底部固定栏使用 insets
const insets = useSafeAreaInsets();

<View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
  <Button title="操作" />
</View>
```

**预防措施**
- [ ] 所有页面根组件使用 SafeAreaView
- [ ] 底部固定元素加上安全区高度
- [ ] 模态框考虑刘海区域

---

### RN-ADAPT-002: 键盘遮挡输入框

**问题现象**
键盘弹出时遮挡输入框，用户看不到输入内容。

**解决方案**
```typescript
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    {/* 表单内容 */}
  </ScrollView>
</KeyboardAvoidingView>
```

---

### RN-ADAPT-003: 暗色模式适配

**问题现象**
- 切换暗色模式时颜色不变
- 部分组件在暗色模式下不可见

**解决方案**
```typescript
import { useColorScheme } from 'react-native';

const colors = {
  light: {
    background: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    border: '#38383A',
  },
};

const Component = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>{content}</Text>
    </View>
  );
};
```

---

### RN-ADAPT-004: 不同屏幕尺寸适配

**问题现象**
- 小屏设备布局拥挤
- 大屏设备过度拉伸

**解决方案**
```typescript
import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();

// ✅ 响应式布局
const numColumns = width > 600 ? 3 : 2;
const itemWidth = (width - 48) / numColumns;

// ✅ 最大宽度限制
<View style={{ maxWidth: 600, alignSelf: 'center', width: '100%' }}>
  {/* 内容 */}
</View>
```

---

## 快速诊断流程

### 渲染错误诊断

```
1. 检查 Metro 控制台错误信息
2. 定位错误组件和行号
3. 检查条件渲染是否使用 !!
4. 检查 key 是否唯一且为 string
5. 检查空数据处理
```

### 布局问题诊断

```
1. 检查 flexDirection 是否正确
2. 检查父容器是否有 flex: 1
3. 检查子元素 alignSelf 设置
4. 使用 backgroundColor 调试边界
5. 检查 overflow 设置
```

### 交互问题诊断

```
1. 检查 TouchableOpacity 嵌套
2. 检查 pointerEvents 设置
3. 检查 zIndex/elevation
4. 检查是否有手势冲突
5. 检查防重复点击处理
```

---

## 问题状态跟踪

| ID | 状态 | 最后验证 |
|----|------|----------|
| RN-RENDER-001 | ✅ 已验证 | 2026-01 |
| RN-RENDER-002 | ✅ 已验证 | 2026-01 |
| RN-RENDER-003 | ✅ 已验证 | 2026-01 |
| RN-RENDER-004 | ✅ 已验证 | 2026-01 |
| RN-RENDER-005 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-001 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-002 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-003 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-004 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-005 | ✅ 已验证 | 2026-01 |
| RN-LAYOUT-006 | ✅ 已验证 | 2026-01 |
| RN-STYLE-001 | ✅ 已验证 | 2026-01 |
| RN-STYLE-002 | ✅ 已验证 | 2026-01 |
| RN-STYLE-003 | ✅ 已验证 | 2026-01 |
| RN-STYLE-004 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-001 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-002 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-003 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-004 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-005 | ✅ 已验证 | 2026-01 |
| RN-INTERACT-006 | ✅ 已验证 | 2026-01 |
| RN-ADAPT-001 | ✅ 已验证 | 2026-01 |
| RN-ADAPT-002 | ✅ 已验证 | 2026-01 |
| RN-ADAPT-003 | ✅ 已验证 | 2026-01 |
| RN-ADAPT-004 | ✅ 已验证 | 2026-01 |
