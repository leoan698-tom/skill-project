---
name: rn-page-generator
description: React Native 移动端页面 AI 生成技能。通过自然语言描述功能需求，自动生成符合设计规范的 React Native 页面代码。支持设计系统初始化、组件生成、完整页面生成、风格校准、迭代优化、组件拆分、设计美学增强等完整工作流。当用户需要创建 React Native 页面、生成移动端 UI 组件、或根据需求描述实现移动端界面时，应使用此技能。
---

# React Native 移动端页面 AI 生成技能

## Overview

将自然语言功能需求转化为生产级 React Native 页面代码的完整技能体系。确保所有生成的代码严格遵守统一设计规范，实现风格一致性、组件复用性和跨设备适配。

## 标准页面生成流程 ⭐

**自然语言需求 → 生产级页面代码**

```
用户输入自然语言需求
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 0: 需求理解与解析              │
│ • 提取页面结构、功能点、交互行为       │
│ • 生成结构化需求文档               │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 1: 设计系统初始化 (首次必执行)    │
│ • 加载设计令牌、组件规范、命名规范     │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 2: 通用组件库扫描 (首次必执行)     │
│ • 扫描项目组件库，建立组件索引         │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 4: 完整页面生成                 │
│ • 优先复用组件库组件               │
│ • 生成页面代码 + 组件复用报告          │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 5: 风格一致性校准 (强制执行) ✅    │
│ • 检查颜色、间距、圆角、字体           │
│ • 确保 100% 符合设计令牌            │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Step 11: 问题预防检查 (强制执行) ✅    │
│ • 根据 troubleshooting.md 检查常见陷阱  │
└─────────────────────────────────────────┘
       │
       ▼
   输出生产级页面代码
```

**标准流程说明**:
- Step 0 → 1 → 2 → 4 → 5 → 11 为页面生成的**强制流程**
- Step 5 (风格校准) 和 Step 11 (问题预防) 为**必经检查点**
- 首次生成后自动进入风格校准，确保系统风格一致

## 工作流决策树

当需要单独执行某个步骤时，参考以下决策树：

```
用户需求类型判断:
├─ 自然语言描述页面需求 → 执行标准流程 (Step 0→1→2→4→5→11) ⭐
├─ 首次使用/新项目 → 执行 Step 1: 设计系统初始化
├─ 指定通用组件库 → 执行 Step 2: 通用组件库扫描与复用分析
├─ 生成通用组件 → 执行 Step 3: 通用组件生成（优先复用）
├─ 生成完整页面 → 执行 Step 4: 完整页面生成（优先复用）
├─ 修正风格偏差 → 执行 Step 5: 风格校准
├─ 优化已有代码 → 执行 Step 6: 迭代优化
├─ 适配验证需求 → 执行 Step 7: 跨设备适配
├─ 通用组件归档 → 执行 Step 8: 组件库回补
├─ 大型组件拆分 → 执行 Step 9: 模块化拆分
├─ 提升设计品质 → 执行 Step 10: 设计美学增强
└─ 排查/修复问题 → 执行 Step 11: 问题排查
```

> **通用组件定义**: 跨页面复用、与业务逻辑弱耦合的 UI 组件（如 Button、Input、Card、Avatar 等）

## Step 0: 需求理解与解析 🎯

**触发时机**: 用户输入自然语言描述的页面需求

**执行动作**:
将自然语言需求转化为结构化需求文档，确保 AI 完整理解用户意图。

**需求解析模板**:

```markdown
## 页面需求解析结果

### 1. 基本信息
- 页面名称: {PageName}Screen
- 页面路径: app/{feature}/{page}.tsx
- 页面类型: [列表页 / 详情页 / 表单页 / 引导页 / 设置页]

### 2. 页面结构 (从上到下)
| 区域 | 功能描述 | 建议组件 |
|------|----------|----------|
| Header | {description} | {component} |
| Content | {description} | {component} |
| Footer | {description} | {component} |

### 3. 数据需求
- 数据来源: [Mock / API / 本地存储]
- 数据结构: {TypeScript 接口定义}

### 4. 交互行为
- 点击事件: {list}
- 表单提交: {list}
- 导航跳转: {list}
- 加载状态: {list}

### 5. 特殊状态
- 加载中: {description}
- 空数据: {description}
- 错误态: {description}
```

**解析检查清单**:
- [ ] 页面结构是否清晰（各区域功能明确）
- [ ] 数据结构是否完整
- [ ] 交互行为是否全面
- [ ] 特殊状态是否考虑（加载/空/错误）

## Step 1: 设计系统初始化

**触发时机**: 首次对话、新项目开始、用户明确要求加载设计规范

**执行动作**:
1. 读取 `references/design-tokens.md` 获取完整设计令牌
2. 读取 `references/component-specs.md` 获取核心组件规范
3. 读取 `references/naming-conventions.md` 获取命名规范
4. 将设计系统作为**最高优先级准则**锁定在上下文中
5. 确认所有后续生成将 100% 遵守规范

**强制约束 (Mandatory Rules)**:
- 禁止使用任何未在设计令牌中定义的颜色值
- 所有间距必须是 4 的倍数
- 禁止自创圆角值，必须从 radius-* 中选择
- 禁止自创阴影，必须从 shadow-* 中选择
- 所有文字必须使用已定义的字体样式
- 使用 TypeScript + 函数组件 + React Hooks
- 样式使用 StyleSheet.create() 或 NativeWind
- 必须适配: SafeAreaView + KeyboardAvoidingView
- 必须支持暗色模式: useColorScheme() 检测
- 禁用状态: 使用 opacity + pointerEvents

**命名规范 (Naming Conventions)** - 参考 `naming-conventions.md`:
- 组件名必须使用 **PascalCase**（如 `PrimaryButton`）
- 文件名与组件名保持一致（如 `PrimaryButton.tsx`）
- Hook 必须以 `use` 开头（如 `useAuth`）
- Props 接口使用 `XxxProps` 格式（如 `ButtonProps`）
- 页面组件以 `Screen` 结尾（如 `HomeScreen`）

## Step 2: 通用组件库扫描与复用分析 ⭐

**触发时机**: 用户指定通用组件库路径、新项目开始、首次生成页面前

> ⚠️ **核心原则**: 优先复用 > 安全扩展 > 新建组件
>
> **通用组件**: 跨页面复用、与业务逻辑弱耦合的 UI 组件（如 Button、Input、Card、Badge、Avatar 等）

**输入收集**:
- 用户指定的组件库路径（如 `src/components/`, `src/ui/`）
- 组件库使用说明/文档（如有）
- 项目中已使用该组件库的页面列表

**执行流程**:

1. **组件库扫描**
   ```
   通用组件目录结构（按功能/语义分组）:
   └─ components/
      ├─ common/        # 基础通用组件
      │  ├─ Button/
      │  ├─ TextInput/
      │  ├─ Card/
      │  ├─ Loading/
      │  └─ EmptyState/
      ├─ layout/        # 布局组件
      │  ├─ Stack/
      │  ├─ HStack/
      │  ├─ VStack/
      │  └─ Grid/
      ├─ feedback/      # 反馈组件（Toast/弹窗）
      │  ├─ Toast/
      │  ├─ AlertDialog/
      │  └─ Snackbar/
      ├─ media/         # 媒体组件
      │  ├─ UserAvatar/
      │  └─ ImageCarousel/
      └─ form/          # 表单组件
         ├─ AppTextInput/
         ├─ AppSelect/
         └─ FormErrorMessage/
   ```

2. **组件信息提取**
   - 组件名称
   - Props 接口定义
   - 导出方式（default/named）
   - 已有变体（variants）
   - 当前使用位置（哪些页面引用）

3. **建立组件索引**
   ```typescript
   interface ComponentIndex {
     name: string;           // 组件名
     path: string;           // 导入路径
     props: PropsDefinition; // Props 定义
     variants: string[];     // 变体列表
     usedBy: string[];       // 使用该组件的页面/组件列表
     capabilities: string[]; // 能力标签（如 'clickable', 'form-input', 'container'）
   }
   ```

4. **输出组件清单**
   将扫描结果作为**高优先级上下文**锁定，后续 Step 3/4 必须参照

**组件分类匹配规则**:

| 分类 | 路径 | 匹配组件 |
|------|------|----------|
| 基础组件 | `common/` | Button, Card, Loading, EmptyState |
| 布局组件 | `layout/` | Stack, HStack, VStack, Grid |
| 反馈组件 | `feedback/` | Toast, AlertDialog, Snackbar |
| 媒体组件 | `media/` | Avatar, ImageCarousel, VideoPlayer |
| 表单组件 | `form/` | TextInput, Select, Checkbox |

**设计需求匹配规则**:

| 设计需求 | 匹配策略 | 示例 |
|----------|----------|------|
| 按钮 | 查找 Button/TouchableButton | `<Button variant="primary" />` |
| 输入框 | 查找 Input/TextInput/TextField | `<Input placeholder="..." />` |
| 卡片 | 查找 Card/Panel/Container | `<Card elevation={1}>...</Card>` |
| 列表项 | 查找 ListItem/Row/Cell | `<ListItem title="..." />` |
| 图标 | 查找 Icon/SvgIcon | `<Icon name="search" />` |
| 头像 | 查找 Avatar/UserAvatar | `<Avatar source={uri} />` |
| 标签 | 查找 Badge/Tag/Chip | `<Badge text="NEW" />` |

**组件修改安全规范** ⚠️:

当需要对已有组件进行细微改动时，必须遵守以下规则：

1. **向后兼容原则**
   - 新增 Props 必须设置默认值
   - 禁止删除或重命名现有 Props
   - 禁止改变现有 Props 的类型

2. **样式隔离原则**
   - 新增样式通过新 Props 控制（如 `variant`, `size`）
   - 禁止修改默认样式值
   - 可通过新增可选 `style` prop 支持自定义

3. **影响评估清单**
   ```
   修改组件前必检:
   □ 该组件被哪些页面使用？ → usedBy 列表
   □ 修改会改变默认渲染结果吗？ → 必须为 NO
   □ 修改会改变默认交互行为吗？ → 必须为 NO
   □ 修改会改变默认布局尺寸吗？ → 必须为 NO
   □ 新增的 Props 有默认值吗？ → 必须为 YES
   ```

4. **安全修改示例**

   ```typescript
   // ✅ 安全：新增可选 Props 带默认值
   interface ButtonProps {
     title: string;
     onPress: () => void;
     // 新增 Props，设置默认值
     size?: 'sm' | 'md' | 'lg';  // 默认 'md'
     iconLeft?: ReactNode;       // 默认 undefined
   }
   
   // ❌ 危险：改变现有行为
   interface ButtonProps {
     title: string;
     onPress: () => void;
     size: 'sm' | 'md' | 'lg';  // 移除了默认值！
   }
   ```

5. **无法安全修改时的处理**
   - 创建新组件（如 `ButtonV2`, `EnhancedButton`）
   - 或创建组合组件包装原组件
   - 在组件库回补步骤（Step 8）中记录

## Step 3: 通用组件精确生成

**触发时机**: 用户请求生成通用 UI 组件（跨页面复用、与业务逻辑弱耦合）

**输入收集**:
- 组件名称 (PascalCase)
- 功能描述
- Props 接口定义
- 使用场景

**执行流程** (优先复用):
1. ⭐ **优先检查组件库** - 在 Step 2 索引中查找匹配组件
2. 若匹配成功 → 直接复用，仅传入所需 Props
3. 若部分匹配 → 评估是否可安全扩展（见 Step 2 修改规范）
4. 若无匹配 → 新建组件，严格按照设计令牌生成样式
5. 使用 TypeScript 定义完整接口
6. 输出完整可运行代码（包含所有 import）

**组件复用决策树**:
```
检查组件库索引 (Step 2 结果):
├─ 完全匹配已有组件
│  └→ 直接使用: import { Button } from '@/components'
├─ 匹配但缺少变体
│  ├─ 可安全扩展 → 新增 Props + 默认值
│  └─ 不可安全扩展 → 创建组合组件包装
├─ 相似组件存在
│  └→ 评估继承/组合方案
└─ 无匹配组件
   └→ 新建组件，后续归档到 Step 8
```

**组件生成模板**:
```typescript
// components/{category}/{ComponentName}.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface {ComponentName}Props {
  // Props 定义
}

export const {ComponentName}: React.FC<{ComponentName}Props> = (props) => {
  return (
    // JSX 结构
  );
};

const styles = StyleSheet.create({
  // 严格遵守设计令牌的样式
});
```

## Step 4: 完整页面生成

**触发时机**: 用户请求生成完整页面或屏幕

**输入收集**:
- 页面名称和路径
- 页面结构（从上到下的区域划分）
- 各区域功能描述
- 数据来源（Mock/API）
- 交互行为描述

**执行流程** (优先复用):
1. 分析页面结构，拆分为多个区域
2. ⭐ **优先从组件库匹配** - 查询 Step 2 索引，列出每个区域可复用的组件
3. 评估匹配组件是否满足需求
   - 完全满足 → 直接复用
   - 部分满足 → 评估安全扩展方案
   - 不满足 → 新建组件
4. 组装完整页面结构
5. 添加必要的状态管理和导航
6. 处理加载态、错误态、空状态
7. 输出完整可运行代码

**页面生成组件复用报告**:
```
组件复用情况:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 复用组件 (N 个):
   - Button (primary) → 提交按钮
   - Input → 表单输入
   - Card → 内容卡片
   
🔧 安全扩展 (M 个):
   - Button + iconLeft → 新增图标支持
   
🆕 新建组件 (K 个):
   - ProductCard → 组件库中无匹配
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
复用率: N/(N+M+K) = XX%
```

**页面结构模板**:
```typescript
// app/{feature}/{page}.tsx (Expo Router)
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

// Mock 数据（后续替换为 API 调用）
const mockData = {};

export default function {PageName}Screen() {
  // 状态管理
  // 数据获取逻辑
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 页面区域 */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // bg-secondary
  },
});
```

## Step 5: 风格一致性校准

**触发时机**: 检测到生成代码存在风格偏差、用户报告样式问题

**校准检查清单**:
- [ ] 按钮高度是否为 48/40/32
- [ ] 圆角值是否在 radius-* 系统内
- [ ] 颜色是否完全使用设计令牌
- [ ] 间距是否为 4 的倍数
- [ ] 输入框 focus 状态是否正确
- [ ] 禁用状态是否使用 opacity + pointerEvents
- [ ] 文字样式是否使用定义的字体系统

**问题预防检查** (参考 `troubleshooting.md`):
- [ ] 条件渲染是否使用 `!!` 转换 (RN-RENDER-001)
- [ ] Badge/标签是否设置 `alignSelf: 'flex-start'` (RN-LAYOUT-001)
- [ ] 阴影是否使用预定义值 (RN-STYLE-003)
- [ ] 圆角是否使用预定义值 (RN-STYLE-004)

**校准动作**:
1. 逐项检查偏差点
2. 列出需要修正的具体值
3. 完整重新生成符合规范的代码
4. 自检确认无遗漏

## Step 6: 多轮迭代优化

**触发时机**: 用户请求优化已生成代码

**优化维度**:

1. **性能优化**
   - FlatList + getItemLayout
   - useMemo 缓存数据
   - React.memo 避免重渲染

2. **交互优化**
   - Toast 提示反馈 (使用绝对定位，见 RN-INTERACT-001)
   - 表单验证提示
   - 触碰/震动反馈
   - 防重复点击处理 (RN-INTERACT-004)

3. **状态处理**
   - Skeleton 加载占位
   - 错误态 + 重试按钮
   - 空状态提示 (RN-RENDER-004)

4. **无障碍优化**
   - accessible 属性
   - accessibilityLabel
   - accessibilityRole

5. **边界处理**
   - 售罄/缺货状态
   - 未登录跳转
   - 网络异常处理

**问题预防检查** (参考 `troubleshooting.md`):
- [ ] 图片是否有加载态/错误态 (RN-RENDER-003)
- [ ] 异步操作是否检查组件挂载状态 (RN-RENDER-005)
- [ ] Modal 内 ScrollView 是否添加 nestedScrollEnabled (RN-INTERACT-002)
- [ ] 列表 key 是否唯一且为 string (RN-RENDER-002)

## Step 7: 跨设备适配验证

**触发时机**: 发布前验证、用户报告适配问题

**适配检查项**:

1. **安全区处理**
   - SafeAreaView 或 useSafeAreaInsets
   - 底部固定栏加安全区高度
   - 刘海屏/挖孔屏显示

2. **尺寸适配**
   - 使用 flex 布局
   - 支持系统字体缩放
   - 图片使用 aspectRatio
   - 使用 useWindowDimensions

3. **键盘适配**
   - KeyboardAvoidingView
   - iOS: behavior='padding'
   - Android: behavior='height'

4. **屏幕尺寸**
   - 小屏 (320px) 正常显示
   - 大屏有最大宽度限制

## Step 8: 组件库回补

**触发时机**: 完成高质量组件后归档

**归档内容**:
1. 组件核心特征描述（100字内）
2. 完整 Props 接口
3. 样式特点（高度/圆角/间距）
4. 使用场景
5. 变体列表

**归档格式**:
```
▸ components/{category}/{ComponentName}.tsx
作用: {一句话描述}
关键特征:
- {特征1}
- {特征2}
Props:
- {prop1}: {type}
- {prop2}: {type}
```

## Step 9: 模块化拆分

**触发时机**: 组件超过 500 行、包含 3+ Modal、职责过多

**执行动作**:
1. 读取 `references/modular-splitting.md` 获取拆分规范
2. 分析组件结构，识别可拆分模块
3. 提取类型定义到 `types.ts`
4. 提取样式到 `styles.ts`
5. 提取业务逻辑到自定义 Hook
6. 拆分子组件到 `components/` 目录
7. 重构主组件为组装容器

**拆分目录结构**:
```
ComponentName/
├── index.tsx           # 主组件 (<150行)
├── types.ts            # 类型定义
├── styles.ts           # 样式定义
├── hooks/
│   └── useLogic.ts     # 业务逻辑
└── components/
    ├── SubA.tsx        # 子组件
    └── SubB.tsx
```

**验证清单**:
- [ ] 每个文件 < 300 行
- [ ] 类型定义完整
- [ ] 职责单一
- [ ] 条件渲染安全

## Step 10: 设计美学增强

**触发时机**: 用户要求提升设计品质、创建独特视觉体验

**执行动作**:
1. 读取 `references/design-aesthetics.md` 获取美学指南
2. 确定美学方向（极简/柔和/大胆/奢华/科技等）
3. 选择有个性的字体组合
4. 设计独特配色方案（避免 AI 风格紫色渐变）
5. 添加精心设计的动效
6. 创造空间层次和视觉深度

**美学检查清单**:
- [ ] 配色是否避免紫色渐变老套
- [ ] 字体是否有个性（非 Inter/Roboto）
- [ ] 布局是否有突破
- [ ] 动效是否有目的且克制
- [ ] 细节是否精致
- [ ] 整体是否有明确美学方向

## Step 11: 问题排查

**触发时机**: 出现运行时错误、布局异常、交互问题

**执行动作**:
1. 读取 `references/troubleshooting.md` 获取问题知识库
2. 根据错误信息定位问题 ID
3. 按解决方案修复问题
4. 验证修复效果

**快速诊断流程**:

| 错误类型 | 常见原因 | 参考 ID |
|----------|----------|----------|
| "Text strings must be rendered..." | 条件渲染 falsy 值 | RN-RENDER-001 |
| 布局拉伸/错位 | 缺少 alignSelf/flexDirection | RN-LAYOUT-001/002 |
| Toast 被遮挡/阻塞交互 | 使用了 Modal | RN-INTERACT-001 |
| ScrollView 不滚动 | 缺少 flex:1 或 nestedScrollEnabled | RN-LAYOUT-006/RN-INTERACT-002 |
| 键盘遮挡输入框 | 缺少 KeyboardAvoidingView | RN-ADAPT-002 |
| 暗色模式异常 | 未使用 useColorScheme | RN-ADAPT-003 |

**高频问题快速修复**:

```typescript
// RN-RENDER-001: 条件渲染必须用 !!
{!!variable && <Component />}
{count > 0 && <Badge count={count} />}

// RN-LAYOUT-001: Badge 自适应宽度
badge: { alignSelf: 'flex-start' }

// RN-INTERACT-001: Toast 用绝对定位
toast: { position: 'absolute', zIndex: 9999, elevation: 9999 }

// RN-INTERACT-002: 嵌套滚动
<ScrollView nestedScrollEnabled={true} />
```

## Resources

### references/

设计规范和开发规范的详细文档:

| 文件 | 内容 | 使用时机 |
|------|------|----------|
| `design-tokens.md` | 设计令牌系统（颜色、圆角、间距、阴影、字体） | Step 1 初始化 |
| `component-specs.md` | 核心组件规范和已有组件清单 | Step 1, 2, 3, 4 |
| `naming-conventions.md` | 组件/文件/Hook/类型命名规范 | Step 1, 3, 4 |
| `modular-splitting.md` | 组件模块化拆分规范、目录结构、常见陷阱 | Step 9 拆分 |
| `design-aesthetics.md` | 前端设计美学指南、配色、字体、动效 | Step 10 美学 |
| `troubleshooting.md` | 问题排查知识库，25+ 常见问题解决方案 | Step 11 排查 |

### assets/templates/

页面和组件模板文件:

- `screen-template.tsx` - 标准页面模板
- `component-template.tsx` - 标准组件模板

**使用方式**: 生成新页面/组件时参考这些模板结构

## 最佳实践

| 场景 | 推荐流程 |
|------|----------|
| **自然语言描述页面需求** | **Step 0→1→2→4→5→11 (标准流程) ⭐** |
| 首次对话 | Step 1 (设计系统初始化) |
| 指定通用组件库 | Step 2 (通用组件库扫描) |
| 生成通用组件 | Step 2 → Step 3 |
| 完整页面 | Step 0 → Step 4 → Step 5 (校准) → Step 11 (检查) |
| 大型组件 | Step 9 (拆分) → Step 6 (优化) |
| 高品质设计 | Step 10 (美学) → Step 4/3 |
| 通用组件归档 | Step 8 |
| 发布前 | Step 7 (适配验证) |
| 出现错误 | Step 11 (问题排查) |

## 效果保证

| 维度 | 使用此技能 |
|------|-----------|
| 风格一致性 | 95%+ |
| 组件复用率 | 85%+ |
| 跨设备适配 | 全面覆盖 |
| 生产可用性 | 直接可用 |
| 代码可维护性 | 模块化拆分 |
| 问题解决率 | 25+ 常见问题覆盖 |
