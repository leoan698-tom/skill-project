=== RN 子技能 8 ===
标题：Skill 8 - AI 工具链集成加速  
版本：v1.0.0  
更新日期：2026-01-21  
导航：返回主文档 → [main_skill.md](./main_skill.md)

---
name: RN Skill 8 - AI 工具链集成加速
description: 本技能用于结合外部生成工具快速产出初稿，并在生成后执行风格对齐与优化，最终输出生产级代码。
---

# 目的
以工具链快速生成初稿，随后严格按设计系统进行精修与对齐。

# 何时使用
- 需要快速搭建页面或列表初稿并在后续微调时。

# 输入
- 工具提示词与后处理对齐检查清单。

# 步骤
1. 使用工具提示词生成初稿（如 RapidNative/Natively/v0.dev）。
2. 按对齐检查清单执行统一风格与架构优化。
3. 输出优化后的完整代码。

# 工具使用提示词（示例：RapidNative）
```text
Create a React Native product listing screen with the following exact specifications:

Design System (MUST FOLLOW):
- Primary color: #007AFF
- Background: #F9FAFB
- Card radius: 12px
- Button height: 48px, radius: 12px
- Spacing: multiples of 4px (4, 8, 12, 16, 24, 32)
- Font: -apple-system, SF Pro Display
- Shadows: use elevation for Android, shadowOffset for iOS

Layout:
- Search bar at top (height 48, radius 12, with search icon left)
- Filter chips row (horizontal scroll)
- Product grid (2 columns, gap 12px)
- Each product card: image (square), title (2 lines max), price (red #FF3B30), badge top-right
- Floating "Filter" FAB bottom-right
- Pull to refresh support

Tech requirements:
- Use Expo Router
- TypeScript
- SafeAreaView + FlatList
- Dark mode support (useColorScheme)
- Optimized with getItemLayout + memo

Generate clean, production-ready code.
```

# 生成后精修流程
```text
刚才使用 [工具名] 生成了初稿代码,现在需要**风格对齐 + 优化**:

【对齐检查清单】
□ 颜色是否完全使用我们的设计令牌
□ 圆角/间距/字体是否符合系统
□ 组件是否可复用已有的(PrimaryButton/Card)
□ TypeScript 类型是否完整
□ 是否有硬编码需要抽离为常量
□ 暗色模式是否正确实现

【优化任务】
1. 替换所有硬编码颜色为设计令牌
2. 统一圆角为 radius-md(12)
3. 按钮改用 PrimaryButton 组件
4. 添加加载态 + 错误态
5. 补充 TypeScript接口定义 
6. 添加必要的注释

请输出**优化后的完整代码**。
```

# 输出要求
- 生产级的完整代码，已按设计系统对齐并完成优化。

# 后处理包含模块化拆分
- 结构对齐：将工具生成的页面/组件按模块化规范重组；UI/Hook/styles/types 分离
- 规模控制：组件≤300行，Hook≤200行；重复逻辑提取为复用单元
- 条件渲染安全性：统一改为 `!!` 或三元；数字显式比较；字符串长度检查
- Toast/Snackbar：移除 Modal 实现，采用绝对定位 + zIndex/elevation，避免交互阻塞

—— 页脚 ——  
文档：sub_skill_8.md | 返回： [main_skill.md](./main_skill.md)

