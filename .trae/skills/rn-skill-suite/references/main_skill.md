# React Native 移动端页面 AI 生成技能体系 — 主文档

版本：v1.0.0  
更新时间：2026-01-21  
维护者：AI 助手

## 更新日志
- v1.0.0（2026-01-21）
  - 重组为主文档 + 八个子文档结构
  - Skill 0 完整内容纳入主文档
  - 为 1–8 子文档建立统一页眉页脚与互链

## 概述
- 本体系覆盖设计系统加载、组件知识库、单组件生成、完整页面生成、风格校准、多轮优化、组件库回补、跨设备适配与工具链集成，加速产出生产级 React Native 页面与组件。
- 目录结构与命名遵循模块化拆分规范（SRP、UI/Hook/styles/types 分离、统一命名与目录模板）。

## 文档目录
- 主文档（当前）：main_skill.md
- 子文档：
  - [sub_skill_1.md（组件知识库构建）](./sub_skill_1.md)
  - [sub_skill_2.md（单组件精确生成）](./sub_skill_2.md)
  - [sub_skill_3.md（完整页面生成）](./sub_skill_3.md)
  - [sub_skill_4.md（风格一致性校准）](./sub_skill_4.md)
  - [sub_skill_5.md（多轮迭代优化）](./sub_skill_5.md)
  - [sub_skill_6.md（组件库回补）](./sub_skill_6.md)
  - [sub_skill_7.md（跨设备适配验证）](./sub_skill_7.md)
  - [sub_skill_8.md（AI 工具链集成加速）](./sub_skill_8.md)

## 核心要点
- 设计系统是最高准则：令牌、圆角、间距、阴影、字体、暗色模式、禁用态等必须严格遵守
- 模块化拆分：组件≤300行、Hook≤200行；UI/Hook/styles/types 独立；目录与命名统一
- 条件渲染安全：统一采用 `!!` 或三元；数字显式比较；字符串长度检查；避免 0/""/null/undefined 渲染错误
- Toast/Snackbar 不使用 Modal：采用绝对定位 + zIndex/elevation，避免阻塞交互
- 复用优先：页面与组件生成均优先复用既有组件（PrimaryButton、Card、Badge、Avatar）

## Skill 0 设计系统初始化（完整内容）

---
name: RN Skill 0 - 设计系统初始化
description: 本技能用于在会话开始时加载并锁定 React Native 设计系统，使其成为后续所有代码生成的最高准则并被严格遵守。
---

# 目的
建立“设计记忆”，在后续所有生成任务中强制遵循统一规范与设计令牌。

# 何时使用
- 首次对话或在开始任意页面/组件生成前。
- 当需要重置或更新当前会话的设计系统。

# 输入
- 完整设计令牌与组件规范文本。

# 步骤
1. 注入以下提示词并要求模型以最高优先级记忆。
2. 要求返回固定确认语句以验证加载成功。
3. 将设计系统视为强制约束，后续生成若有偏差立即校准。

# 标准提示词模板
```text
你现在是 2026 年顶级 React Native 架构师 + 设计系统守护者。

我将为你加载我们产品的完整设计系统，这是**所有后续代码生成的最高准则**。
请以最高优先级记住以下内容，并在之后的**每一次**代码生成中 100% 遵守。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【设计令牌 Design Tokens - 2026 标准】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【颜色系统 Colors】
• primary: #007AFF          // 主色-品牌蓝
• primary-dark: #0062D1     // 主色-深度
• primary-light: #3395FF    // 主色-浅色
• accent: #FF2D55           // 强调色-红
• success: #34C759          // 成功-绿
• warning: #FF9500          // 警告-橙
• danger: #FF3B30           // 危险-红
• info: #5AC8FA             // 信息-青

• bg-primary: #FFFFFF       // 背景-主
• bg-secondary: #F9FAFB     // 背景-次
• bg-tertiary: #F3F4F6      // 背景-三级

• text-primary: #111827     // 文字-主(黑)
• text-secondary: #6B7280   // 文字-次(灰)
• text-tertiary: #9CA3AF    // 文字-三级(浅灰)
• text-disabled: #D1D5DB    // 文字-禁用

• border-default: #E5E7EB   // 边框-默认
• border-focus: #007AFF     // 边框-聚焦
• border-error: #FF3B30     // 边框-错误

• overlay-light: rgba(0,0,0,0.1)   // 遮罩-浅
• overlay-medium: rgba(0,0,0,0.3)  // 遮罩-中
• overlay-dark: rgba(0,0,0,0.6)    // 遮罩-深

【圆角系统 Border Radius】
• radius-xs: 4
• radius-sm: 8
• radius-md: 12
• radius-lg: 16
• radius-xl: 20
• radius-2xl: 24
• radius-pill: 9999         // 胶囊形

【间距系统 Spacing - 必须是 4 的倍数】
基准单位: 4px
可用值: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
命名: xs(4) / sm(8) / md(12) / lg(16) / xl(20) / 2xl(24) / 3xl(32) / 4xl(40) / 5xl(48) / 6xl(64)

【阴影系统 Shadows】
• shadow-sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  }
• shadow-md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  }
• shadow-lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6
  }

【字体系统 Typography】
• font-family: -apple-system, 'SF Pro Display', 'PingFang SC', system-ui, sans-serif

• display-lg:  {fontSize: 36, lineHeight: 44, fontWeight: '700', letterSpacing: -0.5}
• display-md:  {fontSize: 32, lineHeight: 40, fontWeight: '700', letterSpacing: -0.3}
• headline-lg: {fontSize: 28, lineHeight: 36, fontWeight: '600'}
• headline-md: {fontSize: 24, lineHeight: 32, fontWeight: '600'}
• title-lg:    {fontSize: 20, lineHeight: 28, fontWeight: '600'}
• title-md:    {fontSize: 18, lineHeight: 26, fontWeight: '600'}
• body-lg:     {fontSize: 17, lineHeight: 24, fontWeight: '400'}
• body-md:     {fontSize: 15, lineHeight: 22, fontWeight: '400'}
• body-sm:     {fontSize: 13, lineHeight: 20, fontWeight: '400'}
• caption:     {fontSize: 12, lineHeight: 18, fontWeight: '400'}
• overline:    {fontSize: 11, lineHeight: 16, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1}

【核心组件规范 Component Specs】

▸ PrimaryButton (主按钮)
  - 变体: solid | outline | ghost | text
  - 高度: 48 (大) | 40 (中) | 32 (小)
  - 圆角: radius-md (12)
  - paddingHorizontal: 24 (大) | 20 (中) | 16 (小)
  - 文字: title-md (大/中) | body-md (小)
  - solid 变体: bg=primary, text=white
  - outline 变体: border=2px primary, text=primary
  - 禁用态: opacity=0.5 + pointerEvents='none'
  - 加载态: ActivityIndicator + 文字变为 "加载中..."

▸ AppInput (输入框)
  - 高度: 48
  - 圆角: radius-md (12)
  - padding: 14
  - borderWidth: 1
  - borderColor-default: border-default
  - borderColor-focus: border-focus + borderWidth=2
  - borderColor-error: border-error
  - 文字: body-lg
  - placeholderTextColor: text-tertiary
  - 支持: leftIcon | rightIcon | clearButton | secureTextEntry
  - error 状态: 下方显示红色错误文字(body-sm)

▸ Card (卡片)
  - bg: bg-primary
  - 圆角: radius-lg (16)
  - padding: 16
  - shadow: shadow-md
  - 支持: onPress 时有触碰反馈(activeOpacity=0.7)

▸ Badge (徽章)
  - 高度: 24
  - 圆角: radius-pill
  - paddingHorizontal: 12
  - 文字: caption + fontWeight 600
  - 变体色: primary | success | warning | danger | neutral(bg-tertiary)

▸ Avatar (头像)
  - size: sm(32) | md(48) | lg(64) | xl(80)
  - 圆角: 完整圆形(size/2)
  - 支持: 在线状态指示点(右下角,绿色,直径 size*0.2)
  - 加载态: skeleton 动画

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【强制约束 Mandatory Rules】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 禁止使用任何未在上方定义的颜色值(包括 hex/rgb/rgba)
2. 所有间距必须是 4 的倍数,且优先使用已定义的命名值
3. 禁止自创圆角值,必须从 radius-* 中选择
4. 禁止自创阴影,必须从 shadow-* 中选择
5. 所有文字必须使用已定义的字体样式(display-*/headline-*/title-*/body-*)
6. 使用 TypeScript + 函数组件 + React Hooks
7. 样式必须使用 StyleSheet.create() 或 Tailwind/NativeWind
8. 必须适配: SafeAreaView + KeyboardAvoidingView + Dimensions
9. 必须支持暗色模式: useColorScheme() 检测
10. 禁用状态: 使用 opacity + pointerEvents, 不用 disabled 属性

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

请回复: "✅ 设计系统已完整加载并锁定,所有后续生成将 100% 遵守规范"
```

# 期望助手回复
- “✅ 设计系统已完整加载并锁定,所有后续生成将 100% 遵守规范”

# 结构与模块化约束
- 单一职责与规模控制：组件文件≤300行，Hook文件≤200行
- 关注点分离：UI（展示/交互）与业务逻辑（自定义Hook）分离；样式独立至 styles.ts；类型独立至 types.ts
- 目录结构建议：
```
ComponentName/
├── index.tsx
├── types.ts
├── styles.ts
├── hooks/
│   ├── useComponentLogic.ts
│   └── useDataFetching.ts
├── components/
│   ├── SubComponent1.tsx
│   ├── SubComponent2.tsx
│   └── SharedComponent.tsx
└── utils/
    └── helpers.ts
```
- 命名约定：组件文件 PascalCase；Hook 文件以 use 前缀的 camelCase；样式文件 styles.ts；类型文件 types.ts
- React Native 强制规则：
  - 条件渲染必须使用 !! 或三元，避免渲染 0/""/null/undefined 导致 “Text strings must be rendered within a <Text> component”
  - 数字类型显式比较（如 count > 0）；字符串类型检查长度或使用 !!
  - Toast/Snackbar 禁止使用 Modal；必须使用绝对定位 + zIndex/elevation，避免阻塞页面滚动与交互

---

导航：前往子技能  
[sub_skill_1.md](./sub_skill_1.md) · [sub_skill_2.md](./sub_skill_2.md) · [sub_skill_3.md](./sub_skill_3.md) · [sub_skill_4.md](./sub_skill_4.md) · [sub_skill_5.md](./sub_skill_5.md) · [sub_skill_6.md](./sub_skill_6.md) · [sub_skill_7.md](./sub_skill_7.md) · [sub_skill_8.md](./sub_skill_8.md)

