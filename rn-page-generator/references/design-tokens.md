# Design Tokens - React Native 2026 标准

完整设计令牌系统，所有代码生成必须 100% 遵守。

## 颜色系统 Colors

### 主色系 Primary

| Token | Value | 用途 |
|-------|-------|------|
| primary | #007AFF | 主色-品牌蓝 |
| primary-dark | #0062D1 | 主色-深度 |
| primary-light | #3395FF | 主色-浅色 |

### 语义色 Semantic

| Token | Value | 用途 |
|-------|-------|------|
| accent | #FF2D55 | 强调色-红 |
| success | #34C759 | 成功-绿 |
| warning | #FF9500 | 警告-橙 |
| danger | #FF3B30 | 危险-红 |
| info | #5AC8FA | 信息-青 |

### 背景色 Background

| Token | Value | 用途 |
|-------|-------|------|
| bg-primary | #FFFFFF | 背景-主 |
| bg-secondary | #F9FAFB | 背景-次 |
| bg-tertiary | #F3F4F6 | 背景-三级 |

### 文字色 Text

| Token | Value | 用途 |
|-------|-------|------|
| text-primary | #111827 | 文字-主(黑) |
| text-secondary | #6B7280 | 文字-次(灰) |
| text-tertiary | #9CA3AF | 文字-三级(浅灰) |
| text-disabled | #D1D5DB | 文字-禁用 |

### 边框色 Border

| Token | Value | 用途 |
|-------|-------|------|
| border-default | #E5E7EB | 边框-默认 |
| border-focus | #007AFF | 边框-聚焦 |
| border-error | #FF3B30 | 边框-错误 |

### 遮罩 Overlay

| Token | Value | 用途 |
|-------|-------|------|
| overlay-light | rgba(0,0,0,0.1) | 遮罩-浅 |
| overlay-medium | rgba(0,0,0,0.3) | 遮罩-中 |
| overlay-dark | rgba(0,0,0,0.6) | 遮罩-深 |

## 圆角系统 Border Radius

| Token | Value | 使用场景 |
|-------|-------|----------|
| radius-xs | 4 | 小标签、小图标 |
| radius-sm | 8 | 小卡片、小按钮 |
| radius-md | 12 | 输入框、中等按钮 |
| radius-lg | 16 | 大卡片、大模态 |
| radius-xl | 20 | 底部弹窗 |
| radius-2xl | 24 | 全屏弹窗 |
| radius-pill | 9999 | 胶囊形按钮/标签 |

**禁止自创圆角值，必须从以上选择。**

## 间距系统 Spacing

基准单位: **4px**

| Token | Value | 使用场景 |
|-------|-------|----------|
| xs | 4 | 紧凑间距 |
| sm | 8 | 小间距 |
| md | 12 | 中等间距 |
| lg | 16 | 标准间距 |
| xl | 20 | 大间距 |
| 2xl | 24 | 区块间距 |
| 3xl | 32 | 大区块间距 |
| 4xl | 40 | 页面级间距 |
| 5xl | 48 | 大页面间距 |
| 6xl | 64 | 超大间距 |

**所有间距必须是 4 的倍数: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96**

## 阴影系统 Shadows

### shadow-sm
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1
}
```

### shadow-md
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3
}
```

### shadow-lg
```javascript
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6
}
```

**禁止自创阴影，必须从以上选择。**

## 字体系统 Typography

### Font Family
```
-apple-system, 'SF Pro Display', 'PingFang SC', system-ui, sans-serif
```

### 字体样式

| Token | fontSize | lineHeight | fontWeight | 其他 |
|-------|----------|------------|------------|------|
| display-lg | 36 | 44 | 700 | letterSpacing: -0.5 |
| display-md | 32 | 40 | 700 | letterSpacing: -0.3 |
| headline-lg | 28 | 36 | 600 | - |
| headline-md | 24 | 32 | 600 | - |
| title-lg | 20 | 28 | 600 | - |
| title-md | 18 | 26 | 600 | - |
| body-lg | 17 | 24 | 400 | - |
| body-md | 15 | 22 | 400 | - |
| body-sm | 13 | 20 | 400 | - |
| caption | 12 | 18 | 400 | - |
| overline | 11 | 16 | 600 | textTransform: 'uppercase', letterSpacing: 1 |

### 完整样式对象

```javascript
const typography = {
  displayLg: { fontSize: 36, lineHeight: 44, fontWeight: '700', letterSpacing: -0.5 },
  displayMd: { fontSize: 32, lineHeight: 40, fontWeight: '700', letterSpacing: -0.3 },
  headlineLg: { fontSize: 28, lineHeight: 36, fontWeight: '600' },
  headlineMd: { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  titleLg: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  titleMd: { fontSize: 18, lineHeight: 26, fontWeight: '600' },
  bodyLg: { fontSize: 17, lineHeight: 24, fontWeight: '400' },
  bodyMd: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodySm: { fontSize: 13, lineHeight: 20, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 18, fontWeight: '400' },
  overline: { fontSize: 11, lineHeight: 16, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
};
```

## 暗色模式 Dark Mode

使用 `useColorScheme()` 检测系统主题:

```javascript
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';
```

### 暗色主题颜色映射

| Light Token | Dark Value |
|-------------|------------|
| bg-primary | #000000 |
| bg-secondary | #1C1C1E |
| bg-tertiary | #2C2C2E |
| text-primary | #FFFFFF |
| text-secondary | #8E8E93 |
| text-tertiary | #636366 |
| border-default | #38383A |

## 技术要求

1. 使用 TypeScript + 函数组件 + React Hooks
2. 样式使用 StyleSheet.create() 或 NativeWind
3. 必须适配: SafeAreaView + KeyboardAvoidingView + Dimensions
4. 禁用状态: 使用 `opacity: 0.5` + `pointerEvents: 'none'`
5. 触碰反馈: 使用 `activeOpacity: 0.7`
