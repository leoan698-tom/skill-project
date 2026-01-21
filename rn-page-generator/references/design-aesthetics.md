# 前端设计美学指南

为 React Native 移动端界面创建独特、生产级的视觉体验，避免千篇一律的 "AI 风格" 设计。

## 一、设计思维

在编码前，明确设计方向：

### 1.1 理解上下文
- **目的**: 这个界面解决什么问题？谁在使用？
- **基调**: 选择明确的美学方向
- **差异化**: 什么让这个设计令人难忘？

### 1.2 美学方向选择

| 风格 | 特点 | 适用场景 |
|------|------|----------|
| 极简主义 | 大量留白，精简元素 | 工具类、专业应用 |
| 柔和温暖 | 圆角、柔和渐变、暖色 | 社交、生活类应用 |
| 大胆现代 | 鲜艳对比、几何图形 | 创意、年轻用户 |
| 奢华精致 | 深色调、金属质感、细腻动效 | 高端产品、金融 |
| 有机自然 | 不规则形状、自然色彩 | 健康、环保应用 |
| 复古风格 | 怀旧配色、经典元素 | 文化、音乐类应用 |
| 科技未来 | 霓虹、深色、光效 | 科技、游戏应用 |

## 二、字体排版

### 2.1 字体选择原则

**避免使用**:
- Inter、Roboto、Arial（过于普通）
- 系统默认字体（缺乏个性）

**推荐策略**:
- 展示字体 + 正文字体组合
- 选择有性格的字体

### 2.2 React Native 字体配置

```typescript
// 自定义字体族
const typography = {
  // 展示字体 - 用于标题、品牌
  display: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    letterSpacing: -0.5,
  },
  
  // 正文字体 - 用于内容
  body: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
};
```

### 2.3 字体层次

```typescript
const fontStyles = StyleSheet.create({
  // 超大标题 - 震撼感
  hero: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 52,
  },
  
  // 页面标题
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  
  // 卡片标题
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  // 正文
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  
  // 辅助文字
  caption: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});
```

## 三、色彩与主题

### 3.1 色彩策略

**避免**:
- 紫色渐变 + 白色背景（AI 设计典型特征）
- 平均分布的多色调（缺乏主次）

**推荐**:
- 主导色 + 锐利强调色
- 明确的色彩层次

### 3.2 配色方案示例

```typescript
// 方案1: 深沉优雅
const elegantDark = {
  background: '#0A0A0B',
  surface: '#161618',
  primary: '#D4AF37',      // 金色强调
  text: '#FAFAFA',
  textSecondary: '#71717A',
};

// 方案2: 柔和自然
const softNatural = {
  background: '#FDF8F3',
  surface: '#FFFFFF',
  primary: '#2D5A27',      // 森林绿
  accent: '#E8B868',       // 暖黄
  text: '#1A1A1A',
};

// 方案3: 科技蓝
const techBlue = {
  background: '#020617',
  surface: '#0F172A',
  primary: '#38BDF8',      // 电光蓝
  accent: '#F472B6',       // 粉红点缀
  text: '#F8FAFC',
};
```

### 3.3 CSS 变量使用

```typescript
// 使用主题对象保持一致性
const theme = {
  colors: { ... },
  spacing: { ... },
  radius: { ... },
};

// 组件中使用
<View style={{ backgroundColor: theme.colors.surface }}>
```

## 四、动效与微交互

### 4.1 动效原则

- **克制**: 一个精心设计的动效 > 满屏闪烁
- **目的**: 每个动效都应有功能意义
- **流畅**: 使用合适的缓动函数

### 4.2 关键动效场景

```typescript
import { Animated, Easing } from 'react-native';

// 页面加载 - 错落有致的入场
const staggeredEntrance = (items: Animated.Value[], delay = 100) => {
  items.forEach((item, index) => {
    Animated.timing(item, {
      toValue: 1,
      duration: 400,
      delay: index * delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  });
};

// 按压反馈 - 弹性缩放
const pressAnimation = (scale: Animated.Value) => {
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }),
  ]).start();
};

// 滚动触发 - 视差效果
const parallaxScroll = (scrollY: Animated.Value) => ({
  transform: [{
    translateY: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    }),
  }],
});
```

### 4.3 手势交互

```typescript
// 卡片滑动删除
// 长按拖拽排序
// 双指缩放查看
// 下拉刷新自定义动画
```

## 五、空间与构图

### 5.1 布局策略

**打破常规**:
- 非对称布局
- 元素重叠
- 对角线流动
- 网格突破

```typescript
const creativeLayout = StyleSheet.create({
  // 重叠卡片
  overlappingCard: {
    marginTop: -20,
    marginLeft: 16,
    zIndex: 2,
  },
  
  // 对角线排列
  diagonalItem: {
    transform: [{ rotate: '-3deg' }],
    marginLeft: 8,
  },
  
  // 大胆留白
  heroSection: {
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
});
```

### 5.2 间距节奏

```typescript
// 建立明确的间距节奏
const spacing = {
  micro: 4,    // 紧凑元素间
  small: 8,    // 相关元素间
  medium: 16,  // 组件内部
  large: 24,   // 区块间
  xlarge: 40,  // 页面区域
  huge: 64,    // 主要分隔
};
```

## 六、背景与视觉细节

### 6.1 创造氛围

**避免**: 纯色平铺背景

**推荐技法**:

```typescript
// 渐变网格
const gradientMesh = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

// 噪点纹理
const noiseOverlay = {
  backgroundImage: 'url(noise.png)',
  opacity: 0.05,
};

// 几何图案
const geometricPattern = {
  // 使用 SVG 背景图案
};

// 模糊光斑
const blurredOrbs = {
  // 绝对定位的模糊圆形
  position: 'absolute',
  width: 200,
  height: 200,
  borderRadius: 100,
  backgroundColor: 'rgba(99, 102, 241, 0.3)',
  // 配合 blur 效果
};
```

### 6.2 阴影层次

```typescript
// 多层阴影创造深度
const elevatedCard = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  // 第二层阴影（可通过嵌套 View 实现）
};

// 彩色阴影
const coloredShadow = {
  shadowColor: '#6366F1',  // 与元素颜色呼应
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.25,
  shadowRadius: 16,
};
```

## 七、独特性检查清单

生成设计前自问：

- [ ] 配色是否避免了紫色渐变老套？
- [ ] 字体是否有个性？
- [ ] 布局是否有突破？
- [ ] 动效是否有目的且克制？
- [ ] 细节是否精致？
- [ ] 整体是否有明确的美学方向？
- [ ] 用户会记住什么？

## 八、风格一致性

### 8.1 设计决策文档

每个项目应明确：

```typescript
const designDecisions = {
  // 美学方向
  aesthetic: '柔和现代 - 圆润、温暖、亲和',
  
  // 色彩基调
  colorTone: '暖色为主，蓝色点缀',
  
  // 圆角策略
  radiusStrategy: '大圆角 (16-24px) 营造柔和感',
  
  // 动效风格
  motionStyle: '弹性、流畅、不突兀',
  
  // 间距特点
  spacingCharacter: '宽松舒适，呼吸感强',
};
```

### 8.2 组件变体统一

确保同类组件保持一致的设计语言：
- 按钮系列
- 卡片系列
- 输入框系列
- 图标风格
