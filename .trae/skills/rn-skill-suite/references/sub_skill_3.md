=== RN 子技能 3 ===
标题：Skill 3 - 完整页面生成  
版本：v1.0.0  
更新日期：2026-01-21  
导航：返回主文档 → [main_skill.md](./main_skill.md)

---
name: RN Skill 3 - 完整页面生成
description: 本技能用于生成生产级的复杂页面，结构清晰、风格一致、复用既有组件并严格遵循设计系统。
---

# 目的
高质量生成多区域页面，统一风格与技术栈实践。

# 何时使用
- 需要一次性产出完整页面（含导航、列表、选择器、底部操作栏等）。

# 输入
- 页面名称、文件路径、结构分区、技术要求与数据来源（Mock）。

# 步骤
1. 采用 Expo Router、TypeScript 与 StyleSheet.create。
2. 优先复用 PrimaryButton、Card、Badge、Avatar。
3. 支持暗色模式、安全区与键盘适配。
4. 输出完整可运行页面代码（imports、JSX、样式、类型定义、Mock）。

# 提示词模板
```text
你是 React Native 页面架构师,负责生成**生产级、高度一致**的完整页面。

【页面需求】
页面名称: 商品详情页
中文名: ProductDetailScreen
文件路径: app/product/[id].tsx (使用 Expo Router)

【页面结构(从上到下)】

1. 顶部导航栏区域
   - 左侧返回按钮(< 图标)
   - 中间标题(动态,滚动后显示商品名)
   - 右侧分享按钮

2. 商品图片轮播
   - 3~5 张主图
   - 支持左右滑动(使用 FlatList horizontal)
   - 底部页码指示器(小圆点)
   - 高度固定 375(宽高比 1:1)

3. 商品基础信息卡片
   - 商品标题(headline-md,2~3 行)
   - 促销标签(Badge,最多 3 个,水平排列)
   - 当前价格(display-md,primary 色)
   - 原价(划线,text-tertiary)
   - 已售数量 + 好评率(body-sm,浅色)

4. 服务保障区域
   - 3~4 个保障项(icon + 文字,横向滚动)
   - 如: 七天退换、正品保证、极速发货

5. 规格选择区域(可展开/收起)
   - 标题: "选择 颜色/尺寸"
   - 选项: Chip 样式,横向自动换行
   - 已选状态: 边框高亮 + 文字 primary 色

6. 数量选择器
   - 减号按钮 | 数字 | 加号按钮
   - 最小 1,最大 99
   - 按钮高度 32,圆角 8

7. 商品详情 Tab
   - Tab 标题: 图文详情 | 规格参数 | 用户评价
   - 内容区可滚动

8. 底部固定操作栏(SafeArea)
   - 左侧: 客服图标 + 收藏图标
   - 右侧: 加入购物车(outline 按钮) + 立即购买(solid 按钮)
   - 高度 64 + 底部安全区

【技术要求】
✓ 使用 Expo Router 的 useLocalSearchParams 获取商品 id
✓ 使用 ScrollView 包裹主内容,底部操作栏用绝对定位
✓ 必须严格遵守已加载的设计系统
✓ 优先复用组件: PrimaryButton, Card, Badge, Avatar
✓ 新组件需在文件末尾定义,命名清晰(如 ImageCarousel, SpecSelector)
✓ 适配: SafeAreaView + StatusBar + KeyboardAvoidingView
✓ 暗色模式支持(useColorScheme)
✓ TypeScript + StyleSheet.create()
✓ 图片使用占位图: `https://via.placeholder.com/375x375` 
✓ 数据暂时写死(Mock Data),加注释说明后续接口对接位置

请生成**完整可运行**的页面代码,包含:
• 所有必要的 import
• Mock 数据
• 完整的 JSX 结构
• 完整的 StyleSheet
• 类型定义

不要有冗余解释,直接给代码即可。
```

# 输出要求
- 完整页面 TypeScript 代码（imports/JSX/样式/类型/Mock）。
- 不附加解释文本。

# 结构与拆分要求
- 页面按模块拆分：导航、轮播、信息卡、保障项、规格选择、数量选择器、详情Tabs、底部操作栏等分别实现为子组件
- 关注点分离：UI 组件仅展示与交互；业务逻辑封装在 hooks；样式集中在 styles.ts；类型集中在 types.ts
- 目录结构建议（页面内局部组件）：
```
ProductDetail/
├── index.tsx
├── types.ts
├── styles.ts
├── hooks/
│   ├── useProductDetail.ts
│   └── useSpecSelector.ts
└── components/
    ├── ImageCarousel.tsx
    ├── InfoCard.tsx
    ├── ServiceGuarantees.tsx
    ├── SpecSelector.tsx
    ├── QuantityStepper.tsx
    ├── DetailTabs.tsx
    └── BottomBar.tsx
```
- 规模控制：单文件≤300行；Hook≤200行；复用已有组件（PrimaryButton/Card/Badge/Avatar）
- React Native 强制规则：
  - 条件渲染采用 !! 或三元，避免 0/""/null/undefined 渲染错误
  - Toast/Snackbar 禁用 Modal，采用绝对定位 + zIndex/elevation，避免阻塞交互

—— 页脚 ——  
文档：sub_skill_3.md | 返回： [main_skill.md](./main_skill.md)

