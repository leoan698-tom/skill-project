=== RN 子技能 1 ===
标题：Skill 1 - 组件知识库构建  
版本：v1.0.0  
更新日期：2026-01-21  
导航：返回主文档 → [main_skill.md](./main_skill.md)

---
name: RN Skill 1 - 组件知识库构建
description: 本技能用于向模型注入现有核心组件的“标准答案”，使后续生成优先复用并保持风格一致。
---

# 目的
建立组件参考标准，强制后续生成对齐结构、命名与样式。

# 何时使用
- 在生成任何新组件或页面前。
- 当需要提醒模型严格复用已有组件。

# 输入
- 组件清单与关键特征说明。

# 步骤
1. 注入组件知识库提示词。
2. 要求返回固定确认语句以验证建立成功。
3. 后续生成任务必须复用与模仿这些组件。

# 提示词模板
```text
以下是我们项目中**已存在且风格完全正确**的核心组件代码。

请将它们视为**最高优先级参考标准**:
• 任何相似功能的新组件,必须模仿这些组件的结构/命名/样式
• 生成页面时,优先复用这些组件,而非重新创造
• 如果需要变体,在这些组件基础上扩展,而非推翻重写

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【已存在组件清单】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▸ components/ui/PrimaryButton.tsx
作用: 主按钮(solid/outline/ghost/text 四种变体)
关键特征:
- 高度 48, 圆角 12, 水平内边距 24
- 支持 loading 状态(显示 ActivityIndicator)
- 支持 disabled 状态(opacity 0.5)
- 文字使用 title-md 字体
- 有触碰反馈(activeOpacity 0.7)

▸ components/ui/AppInput.tsx
作用: 统一输入框
关键特征:
- 高度 48, 圆角 12, 内边距 14
- 支持 leftIcon, rightIcon, clearButton
- focus 时边框从 1px border-default → 2px border-focus
- error 状态显示红色边框 + 下方错误文字
- 支持 secureTextEntry(密码框)

▸ components/ui/Card.tsx
作用: 通用卡片容器
关键特征:
- 圆角 16, padding 16, shadow-md
- 背景色 bg-primary
- 支持 onPress(有触碰反馈)
- 可选 header/footer 插槽

▸ components/ui/Badge.tsx
作用: 小标签/徽章
关键特征:
- 高度 24, 圆角 pill, 水平内边距 12
- 文字 caption + fontWeight 600
- 变体: primary/success/warning/danger/neutral

▸ components/ui/Avatar.tsx
作用: 用户头像
关键特征:
- size: sm(32)/md(48)/lg(64)/xl(80)
- 圆形(borderRadius = size/2)
- 支持在线状态指示点
- 加载态 skeleton 动画

▸ components/ui/SearchBar.tsx
作用: 搜索框
关键特征:
- 高度 48, 圆角 12
- 左侧放大镜图标(Feather 'search')
- 右侧清除按钮(有文字时显示)
- focus 时边框高亮

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

如果你能完整理解以上组件的设计意图和风格特征,
请回复: "✅ 组件知识库已建立,将优先复用已有组件并保持风格一致"
```

# 期望助手回复
- “✅ 组件知识库已建立,将优先复用已有组件并保持风格一致”

—— 页脚 ——  
文档：sub_skill_1.md | 返回： [main_skill.md](./main_skill.md)

